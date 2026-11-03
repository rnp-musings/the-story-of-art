# Review queue: what to verify first

Every entry on the site is a **draft**. The 226 entries added in the final build were each researched by an AI research agent that was told to list only pages it had opened, to attribute contested claims, and to leave out anything it could not verify. The agents then reported what they were least sure of. This file is that list, so a human reviewer knows where to start. It is a to-do list, not a list of known errors.

How to review an entry: open each source on its page, check the claims against it, correct the JSON, set the source's `checked` to `true` in `content/sources.json`, and when you are happy with the entry set its `review_status` to `reviewed`. Ideally a person with real knowledge of the tradition (a practitioner, scholar, museum or craft body) reviews it, not only a desk check.

## Priority order
1. **Music and classical dance.** The research was thinnest here (mostly Wikipedia plus UNESCO). Examples of unsupported or memory-based items: the 1947 Madras Devadasis Act wording in Bharatanatyam, Birju Maharaj's lineage in Kathak, Kuchipudi temple and school details, Sangeet Natak Akademi recognition years, gharana founders.
2. **Anything naming a living person or an honour** (Padma awards, Sangeet Natak Akademi awards, UNESCO prizes). These were left out unless a source supported them, but several rest on a single Wikipedia page.
3. **Entries with one source** (18 entries) and the **25 older entries with none** (listed below).
4. **GI (Geographical Indication) status and years.** Many agents found conflicting years. Where sources disagreed the text says so; check the official GI registry (ipindia.gov.in) and replace with the registry date.
5. **UNESCO claims.** UNESCO pages usually returned 403 to the agents, so several inscription years come from secondary sources (Hoysala 2023, Konark, Mahabalipuram, Khajuraho, Sanchi, Bhimbetka, Hampi, Ajanta and Ellora, Chandigarh Capitol Complex). Check whc.unesco.org and ich.unesco.org.
6. **Map pins.** Most pins are approximate (marked "approximate": true in the JSON). Spot-check against a real map.

## Older entries with no sources (written from general knowledge in the first rounds)
bidri, channapatna, papiermache, longpi, majuli, cheriyal, gond, kalighat, madhubani, mysore, pattachitra, phad, pichwai, pithora, thangka, tanjore, warli, dhokra, chikankari, kalamkari, pashmina, kantha, manipuri-weaving, pachedi, sualkuchi.
These were drafted before the sourcing standard existed. Treat their dates, honours and GI/UNESCO statements as unverified. The Kerala entries (keralamural, kathakali, theyyam, koodiyattam, mohiniyattam, kalaripayattu, aranmula-kannadi, nettipattam, kerala-handloom) and everything after them do have sources.

## Per-batch notes from the research agents
Items marked "left out" are things the agent could not verify and did not publish; a reviewer with access to better sources could add them.

### Kerala (11 entries)
- Krishnapuram Gajendra Moksham mural size: sources give 154, 49, 53 or 150 sq ft, so no figure is given.
- Aranmula Kannadi: GI date (2003, 2004-05 or 19 Sep 2005 per IP India); number of families (8, "fewer than 10"); legend differs between accounts; GI ownership dispute is reported neutrally.
- Mural dates (Thirunandikkara "traditionally c. 8th-9th century", Mattancherry 1545-1557, Padmanabhapuram and Ettumanoor mid-18th century) are approximate. Pigment recipes come from Wikipedia and a UCLA abstract; the guna colour logic is the tradition's own account, not checked against the old manuals.
- Guruvayur Mural Painting Institute (1989): credit for founding is attributed differently; the first principal's name and the 10-per-year intake are Wikipedia-only.
- Kuthampully is in Thrissur district and Chendamangalam is in Ernakulam (an earlier brief had these wrong). Chendamangalam GI year: 2011 or 2012.
- Kerala Kalamandalam founding: 1927 or 1930 (inaugurated Nov 1930 at Kunnamkulam), moved to Cheruthuruthy 1933 or 1936, deemed university 2006. Mani Madhava Chakyar's honours, Meenakshi Amma's Padma Shri 2017, the 1804 Kalaripayattu ban and the 1937 book are Wikipedia-sourced. Vishnumoorthy Theyyam detail and the number of surviving sacred groves were not verified. Mohiniyattam temple dancers under the Chera kings is Kerala Tourism's view and hard to prove.
- Left out: named living mural painters, caparison makers and weavers; Kapila Venu.

### Classical dance (Bharatanatyam, Kathak, Odissi, Kuchipudi, Sattriya, Manipuri)
- Sources were mainly Wikipedia and UNESCO's Sankirtana page; CCRT, Sangeet Natak Akademi and Indian Culture portal pages did not load, so those links were removed (several entries now list 1-3 sources; Kathak has one).
- From memory, not found in fetched pages: the 1947 Madras Devadasis Act (hedged), Raigarh and Raja Chakradhar Singh, Kalka-Bindadin as Birju Maharaj's line, Kuchipudi's Bala Tripura Sundari temple and Siddhendra Kalakshetram, Jayadeva and Kalicharan Pattanayak details, Wajid Ali Shah's reign years, spellings of Serfoji II and Sivanandam, "Madras Music Academy 1932".
- Not verified: SNA recognition years (only Sattriya 2000 is stated), the Kathak Kendra founding date, Birju Maharaj's dates and role, the Jaipur and Lucknow gharana founders' dates, the 1974 Manipuri recognition, pung cholom and jagoi details, Odissi gurus other than Kelucharan Mohapatra. Manipuri, Kuchipudi and Sattriya "place" sections are generic.

### Folk dance and theatre (Chhau, Garba, Lavani, Yakshagana, Ramlila, Therukoothu)
- UNESCO years for Chhau (2010), Ramlila (2008) and Garba (2023, "Garba of Gujarat") were read on UNESCO; the Garba "December 2023, Kasane, Botswana" and "15th element" come from press reports.
- Ramnagar Ramlila founding "about 1830": sources disagree and the story is a legend. Kattaikkuttu Sangam registration (1990 or 2002): both are given. Kannappa Thambiran's 1972 Kalaimamani title and the Purisai school (2007) rest on search summaries. The 1948 Bombay ban on lavani and tamasha is from one performer quoted in Open magazine. Karanth's Yakshagana changes and the legal ruling on the name are Wikipedia-only. The Purulia mask tradition dated to the mid-19th century is one press report.
- Left out: named lavani performers' honours, Chhau gurus and Padma awardees, Seraikella training centre date (the Wikipedia line looked wrong), SNA records for all six, a Draupadi-festival source for Hanuman and Arjuna stories.

### Music (Hindustani, Carnatic, Dhrupad, Baul, Manganiyar-Langa, Qawwali)
- **Weakest research on the site.** Only UNESCO (Baul) and Wikipedia were fetched. A placeholder Sangeet Natak Akademi link was removed.
- Not verified or flagged uncited: gharana founders (so none are named), the Langa community history (the text says it needs a source), Rajasthan Roots and the Jaisalmer Desert Festival, named living Carnatic artists, qawwal families, Ajmer qawwali history, the rudra veena and dhrupad link, the Dagar tradition claims, Bettiah gharana claims. Lalon's dates differ by a year between sources (stated). Khusrau and Nizamuddin death dates (1325) are hedged. Purna Das Baul's 1967 title and Sakar Khan and Lakha Khan are Wikipedia-only.

### Sculpture (Chola bronzes, Mamallapuram, Hoysala, Khajuraho, Bankura, Konark)
- UNESCO pages returned 403: inscription years (Konark and Mahabalipuram 1984, Khajuraho 1986) are from memory; the Hoysala inscription (18 Sept 2023, three sites) is from PIB and Wikipedia.
- Belur "about 1117" and Somanathapura "13th century" are not tied to a fetched source; "lathe-like turning" of pillars is flagged uncertain. Dasoja/Chavana and Ruvari Mallitamma come from imp-art.org summaries. Khajuraho "about 25 of about 85 temples survive" and the T. S. Burt rediscovery are from general knowledge (marked unverified); Kandariya Mahadeva date is shown as disputed. Konark sundial wheels and Khondalite are popular or secondary claims; "chlorite deity images" is from memory. Sembiyan Mahadevi's patronage is "often credited"; the Swamimalai GI year is "about 2008-09" and the GI number was omitted because sources conflict.
- Left out: named sculptors and living master craftspeople; Bankura potter counts; whether the Bishnupur temples are on a UNESCO list; any link between Odisha's maharana families and Konark.

### Puppetry and instrument making (Kathputli, Tholpavakoothu, Togalu Gombeyatta, Miraj, Thanjavur veena, Mridangam)
- Awards for the Pulavar family (Krishnankutty Pulavar's SNA award, K. K. Ramachandra Pulavar's Padma Shri 2021, Rajeev Pulavar's 2016 Bismillah Khan Yuva Puraskar) and the Bhat puppeteers' SNA awards came from search snippets and Wikipedia.
- Thanjavur veena GI year (2010 versus 2012-13) and whether it was the first instrument to get a GI (contested by the Bobbili veena). Miraj founder story differs (Faridsaheb 1827-1898 versus two Shikalgar brothers); gourd origin Mangalvedha or Pandharpur. Mridangam skin layers differ by source; caste details rest on Outlook, PARI and a book review. Kathputli GI (2006) is only on one page. Tholpavakoothu facts partly from search summaries (tourism pages returned 503).
- Left out: Koppal and Anantapur and the Dasara link for Togalu Gombeyatta (no source), named veena-making families.

### Andhra Pradesh, Telangana, Tripura
- GI years that differ by source: Kondapalli (2005, 2006 or 2007), Bobbili veena (2011 or 2012), Pochampally (2004 or 2005), Nirmal toys (2008 or 2009). Uppada Jamdani weavers are Padmasali or Devang by source. Bonalu's origin plague (1813 or 1869) and state-festival year (2014 or 2016). Perini dates: Nritta Ratnavali 1253-54 versus Jayapa Senani 1203-1235. Lepakshi temple date varies (1530, about 1538, 1540); "largest mural in Asia" claims conflict.
- Left out: Dalavai Chalapathi Rao and Miriyala Apparao (pages failed), Hozagiri artists' names, any UNESCO claim for Bonalu, firm origin dates for Reang weaving, Hozagiri, Oggu Katha, Pochampally ikat.

### North-east (Arunachal, Mizoram, Meghalaya, Nagaland, Assam, Manipur, Sikkim)
- Thin entries: Khamti and Wancho weaving and woodcarving (almost no source detail), Sikkimese carpets (one source), Kauna craft (one source, GI status unclear: one page says 2023, a register record says "Refused"), Khasi and Garo cane and bamboo (one source), Eri/Ryndia silk (Ryndia GI April 2025 from a press release the agent did not open), Garia dance (blog-sourced instruments), Tripura bamboo and cane (two news articles), Japi (no confirmed districts), Singhi Chham (mostly Wikipedia).
- Disputed: Puanchei two or three pieces, Mon Shugu GI, Khuallam men's dress, Cheraw Guinness count (10,736 or 10,763), Lohe shawl (men or women), Behdeinkhlam origin (famine legend or cholera), Sankardeva's century (15th or 16th), Aronai "presented to warriors" (Bharatpedia only), Unakoti UNESCO tentative-list date (Homegrown only), Sarthebari history (Wikipedia page carries an AI-text warning).
- Corrected: the brief said Chumukedima pottery and Longpi were related; no source supports that. Longpi is Tangkhul pottery from Ukhrul, Manipur. Thang-ta's UNESCO inscription claim (2017) looked wrong and was omitted.
- Left out: named master weavers, carvers and performers in all of these.

### Bihar and Jharkhand
- Sikki GI year (2018 or 2007); Manjusha's age (7th century from a promotional foundation; 2600 BC is the artists' own claim, both attributed); Tikuli's 800-year origin and revival date (1950 or 1954); Jat-Jatin is a thin entry and sources disagree whether it is a couple's dance or a women's rain ritual; Sujni GI and revival dates are Wikipedia-only. Sohrai-Khovar GI year (2019 or 2020); Paitkar and Jadu Patua artisan counts (45 versus 54 families) and the King Ramchandra Dhal origin story (one article); Baha's Falgun timing is from a search summary.
- Left out: Manjusha's 2021 GI and Nirmala Devi's 2025 Padma Shri (the confirming pages failed), Tussar silk GI and named weavers.

### Chhattisgarh and Odisha
- Teejan Bai's Padma Shri (1988 or 1987) and SNA award (1995 or 1996) years differ. **A report of her death in July 2026 came from a single outlet and was deliberately removed** (also a map-pin label naming a hospital). Re-add only after confirmation from multiple reliable sources.
- Sirpur dates differ (595-605 CE per Wikipedia; second half of the 7th century per Puratattva). Kosa GI 2011 is from one source. Raut Nacha's sticks-and-shields account is from one student site. Godna material is mostly Baiga from Dindori, Madhya Pradesh.
- Odisha: origin dates for ikat, Pipli, Tarakasi and Ghumura vary by source; the Saura painter is "Idimar" (OdishaBytes) or "Kudang" (Wikipedia); Ghumura performer gender is disputed; Talapatra rests on one source. GI claims for Sambalpuri, Talapatra and Saura were omitted.

### West Bengal
- Kumartuli origin dates (about 1757, Dhaka to Krishnanagar story) differ by account; Jatra's earliest performance (1507 per Wikipedia or 1548 per Banglapedia); Murshidabad silk GI application (2023) has no confirmed outcome; Baluchari's move to Bishnupur has no firm date; the Jamdani entry is mostly the Bangladeshi tradition plus Shantipur and Phulia (Nadia), because sources treated Dhaniakhali as a separate GI sari. Shola's GI could not be confirmed. Medinipur Patachitra and Shola entries are short.

### Punjab, Haryana, Chandigarh, Himachal, Uttarakhand
- Phulkari GI (2010 or 2011); Gatka origin (15th century or Guru Hargobind's time); Dhadi court names (one scholarly article). "Khadda weaving" found no source using that word, so the entry is written on khes and the pit loom (khaddi) and says so.
- Haryana: Saang origin dates and Rock Garden opening (1976 or 1986) conflict; Lakhmi Chand's number of Saangs and teachers differ (Wikipedia versus Tribune); sources conflict on whether khes is still woven in Panipat. Himachal: Chamba rumal GI (2007 or 2010); Kullu shawl GI left out; the Kangra GI 2012, Bebe Nanaki rumal and Kullu shawl history are tradition or retailer-sourced; Pahari wall painting and Kullu Nati name no artists. Uttarakhand: Ringal's GI rests on one blog; Aipan's GI year (2021 per Wikipedia, 2023 in search results); origin claims for Kumaoni Holi, Aipan, Chholiya and Ramman are traditional; Jageshwar rests on one source (Wikipedia).

### Rajasthan, Gujarat, Maharashtra, Madhya Pradesh, Goa, Ladakh
- Rajasthan: Thewa founding (1707, 1767 or "about 400 years") and GI (2014 per one site); Kota Doria GI (1999 or 2005); Usta art origin story contested; Bandhej "5,000 years" and the Man Singh and Lahore story for meenakari rest on commercial pages; blue pottery GI (2006 or 2009) and the kite-flying origin is a legend; Bagru GI 2024 is Wikipedia-only; Sawant Singh's reign end (1757 or 1764); Gulabo Sapera credited only by Wikipedia.
- Gujarat: Patola GI and the Kumarpal and Jalna migration date conflict; Rogan's GI, awards and "only authentic family" claims are the family's own website; Kutch embroidery GI date inconsistent; Ajrakh GI "reported 2024". Bandhani's and Ajrakh's Rajasthan sides are barely covered.
- Maharashtra: Kolhapuri GI (2018 or 2019); Sawantwadi toys GI (2017 to 2024); Himroo GI unconfirmed; Dashavatara "at least 500 years" is PARI's estimate; the Chitrakathi Shivaji-spy story is the family's account; Paithani GI 2010 is "citation needed" on Wikipedia. Ajanta and Ellora rest on Wikipedia alone.
- Madhya Pradesh: Chanderi weaver communities and the Japanese silk date (1930s or 1945); Rehwa Society founding (1978 or 1979); Bagh print origin; Haddu and Hassu Khan death dates; Rai dance rests on one exam-prep website; Sanchi's inscription year and rediscovery story were left out; Baiga tattoo needle and ink details have no readable source.
- Goa and Ladakh: Hemis festival date (24-25 June or early June); Dekhni is a song or a women's dance by source; Mando origin (about 1840 or 1846); azulejo revival credited to two different people; no source found for a distinct Ladakhi knotted-carpet tradition or Ladakhi torma making, so those entries are short. Kunbi GI tag left out.

### Delhi, Andaman and Nicobar, other union territories, Jammu and Kashmir
- Dastangoi origin (13th or 16th century); Delhi tabla artists' dates; Siddhar Khan's origins; hodi GI rests on Nicobar Times (Dec 2024). Diu stone carving, Karaikal terracotta, kallai mats, Dhodia bamboo craft and Auroville paper: the agent found no source naming these crafts specifically, so the entries describe adjacent, sourced material and say so. These five need a better source or should be merged or removed.
- Kashmir: Sozni rests on two commercial pages; Bhand Pather has one readable source; carpets and Rouf are thin; walnut carving GI (2007-08 or "started"); Sufiana Kalam maqam count and origin century differ.

### Uttar Pradesh, Tamil Nadu, Karnataka and the Kerala additions
- Moradabad GI (2013 or 2014) and founding story (1600 or 1624); Khurja GI uses the registry dates (filed 2009, certificate 2015); Firozabad and Bhadohi origin stories and shares are estimates or producer claims; Zardozi's "Rig Veda" origin is flagged unsupported. Braj Raslila origin accounts conflict; Varanasi toys GI (2014 or 2015); Kishan Maharaj's awards are Wikipedia-only; Mathura sculpture names no sculptors; Nautanki has one source (Sahapedia).
- Tamil Nadu: Kanchipuram weaver counts (5,000 to 60,000 families) and the 2005 GI date; Narasingapettai district (Nagapattinam or Thanjavur); Karagattam is the weakest entry; Villupattu's 15th-16th century date and its mention in old Tamil literature came from search summaries; Pattamadai GI (2012-13 or 2013); Athangudi's "over 500 years" is unsupported; Thanjavur doll date (early 19th century under Serfoji II, a 17th-century outlier); Sungudi rests on one article.
- Karnataka: Kasuti and Ilkal GI years came from search snippets; Lambani GI (2008 or 2010) and artisan counts; Hampi has one source (Wikipedia); Sandalwood carving's Gudigar and Goa origin is "reported"; Mysore silk's zari percentage and Tipu Sultan's role are weak; Kerala additions: Nangiar Koothu performers (Nangiar or Chakkyar) conflict; Chavittunatakam's date (16th or 17th century); Pulikali has a single source; Padayani origin is unsettled.

### Pan-Indian entries
- Visual (rangoli, mehndi, Mughal and Rajput miniatures, Bhimbetka, Harappan art, temple architecture): every source is Wikipedia. Bhimbetka has one source and its 40,000-year date (Wakankar's, attributed) and "over 100,000 years" occupation need checking. Sojat's "only export region" claim and GI is a single line. The Mughal and Rajput "future" bullets say outright that no specific source was found for training programmes.
- Music (sitar and sarod, tabla, ghazal, harikatha, bhakti kirtan, Sufi music): sitar and sarod origins (Bangash versus Niamatullah Khan) are kept as contested; Begum Akhtar's award years differ so none are given; tabla gharana founders come from Wikipedia pages lacking citations; Sufi music is short and names no qawwals.
- Harappan art carries a pin at Mohenjo-daro in Pakistan, outside the map outline, because it is the find-spot of the Dancing Girl; its states read "Gujarat · Haryana · Pakistan border region". Decide whether to keep it.
