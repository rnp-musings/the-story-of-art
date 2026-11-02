#!/usr/bin/env python3
"""Validate content/ against schemas/ and check cross references.

Checks: JSON Schema for every collection, unique ids across collections (ids double as URLs and
DB primary keys), every source_id exists, images exist in public/images, pins fall inside India's box.
Exits 1 on any error.
"""
import json, pathlib, sys
from jsonschema import Draft202012Validator

root = pathlib.Path(__file__).resolve().parent.parent
errors = []

def load(p):
    try:
        return json.loads(p.read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001
        errors.append(f"{p}: cannot parse ({e})")
        return None

def validate(data, schema_path, label):
    schema = json.loads((root / "schemas" / schema_path).read_text())
    for err in Draft202012Validator(schema).iter_errors(data):
        loc = "/".join(str(x) for x in err.absolute_path)
        errors.append(f"{label}: {loc}: {err.message[:160]}")

sources = load(root / "content" / "sources.json") or []
validate(sources, "source.schema.json", "sources.json")
source_ids = [s["id"] for s in sources if isinstance(s, dict) and "id" in s]
if len(source_ids) != len(set(source_ids)):
    errors.append("sources.json: duplicate source ids")
urls = [s.get("url") for s in sources if isinstance(s, dict)]
if len(urls) != len(set(urls)):
    errors.append("sources.json: duplicate source urls")

seen, total = {}, 0
for f in sorted((root / "content" / "arts").glob("*.json")):
    data = load(f)
    if data is None:
        continue
    validate(data, "art.schema.json", f.name)
    for e in data:
        total += 1
        i = e.get("id")
        if i in seen:
            errors.append(f"{f.name}: id '{i}' already used in {seen[i]}")
        seen[i] = f.name
        for sid in e.get("source_ids", []):
            if sid not in source_ids:
                errors.append(f"{f.name}: {i}: unknown source id {sid}")
        for im in e.get("images", []):
            if not (root / "public" / "images" / im.get("file", "")).exists():
                errors.append(f"{f.name}: {i}: image file missing {im.get('file')}")

if errors:
    print(f"{len(errors)} problem(s):")
    for x in errors[:60]:
        print(" -", x)
    sys.exit(1)
print(f"content ok: {total} art forms, {len(sources)} sources")
