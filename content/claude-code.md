# CLAUDE CODE (claude-code.html) — Copy

Separate hobby page for projects built with Claude Code. Not job-targeted;
sits beside Projects in the nav. Finnish, like the rest of the site. Product
and feature names (Claude Code, superpowers, agent teams, worktree, pull
request) stay in English, the same way Projects keeps "Active Directory".

Each entry reuses the Projects case-entry pattern: a mono metadata line
(number · workflow · stack), title, short description, an "opittua" note,
tags, repo link. No status dot: these aren't support cases.

---

## Intro

Claude Code on Anthropicin tekoälytyökalu, jonka kanssa voi rakentaa
ohjelmistoja keskustelemalla. Se lukee koodia, kirjoittaa sitä ja ajaa
komentoja suoraan omalla koneellani. Aloin käyttää sitä uteliaisuudesta:
halusin nähdä, kuinka pitkälle pääsen rakentamaan oikeita asioita ilman
kehittäjätaustaa.

Siitä tuli silti enemmän kuin kokeilu. Se pakotti minut opettelemaan asiat
kunnolla: käyttämään Gitiä, etenemään suunnitelman mukaan improvisoinnin
sijaan ja tarkistamaan oman työni ennen kuin sanon sen valmiiksi. En usko
löytäneeni mitään oikotietä. Tämä on pikemminkin tapa, jolla opin
rakentamaan asioita oikein.

Tälle sivulle kokoan projekteja, joita olen tehnyt Claude Coden kanssa. Tämä
on harrastuspuolta, erillään helpdesk-labroistani, joten jokaisen projektin
kohdalla kerron myös, mitä opin.

---

## Projekti 01 — Työasemakatsastus

**Metadata line:** Projekti 01 · Työtapa: suunnitelma ensin (superpowers) · PowerShell

PowerShell-skripti, joka käy läpi samat asiat kuin tukihenkilö, kun käyttäjä
kertoo koneen olevan hidas: levytilan, Windows-päivitykset, tärkeät palvelut,
virhelokit, verkkoyhteyden, käynnissäoloajan ja muistin käytön. Tuloksista
syntyy yksi HTML-raportti, jonka voi liittää tikettiin. Värikoodauksesta näkee
heti, mihin kannattaa tarttua ensin.

Rakensin sen superpowers-työnkululla: ensin tarkentavat kysymykset ja lyhyt
suunnitelma, jonka hyväksyin ennen koodausta. Ajoin skriptin omalla koneellani
sekä PowerShell 5.1:llä että 7:llä, ja repon esimerkkiraportti on siitä
ajosta. Ennen julkaisua vaihdoin raportista koneen nimen ja operaattorin
DNS-osoitteet yleisiin.

**Opittua:** Windowsin pikakäynnistys (Fast Startup) on oletuksena päällä,
jolloin "Sammuta" ei nollaa käynnissäoloaikaa. Käyttäjä voi siis sanoa
sammuttaneensa koneen eilen, vaikka se on ollut käynnissä viikkoja. Siksi
raportti neuvoo käyttämään nimenomaan "Käynnistä uudelleen" -toimintoa, kun
kone on ollut pitkään päällä. (Source: tyoasemakatsastus.ps1 Test-Uptime
recommendation and README "Asioita, joita opin".)

**Tags:** PowerShell, Windows, HTML
**Link:** https://github.com/Mireabdi/ClaudeCode/tree/main/tyoasemakatsastus

---

## Projekti 02 — Tämä sivusto

**Metadata line:** Projekti 02 · Työtapa: agent teams · HTML/CSS

Portfolioni uudistus yhden sivun versiosta monisivuiseksi sivustoksi,
rakennettuna yhden tyylioppaan pohjalta.

Työ jaettiin agent teams -toiminnolla. Jokaisella tiimiläisellä oli oma
roolinsa, ja jokainen työskenteli omassa worktreessaan:

- `task-lead` (tiiminvetäjä) koordinoi työtä, jakoi tehtävät muille ja teki
  päätökset sivujen rakenteesta ja sisällöstä.
- `design-lead` kirjoitti tyylioppaan: värit, typografian, komponentit ja
  säännöt siitä, mitä sivustolla ei tehdä.
- `content-dev` kirjoitti tekstit neljälle sivulle labrojen ja CV:n todellisen
  sisällön pohjalta.
- `frontend-dev` rakensi sivupohjan (navigaatio, alatunniste, teeman vaihto)
  ja sivut tyylioppaan ja tekstiluonnosten mukaan.

Jokaisen tiimiläisen työ tarkistettiin ja korjattiin ennen kuin se
yhdistettiin sivuston pääversioon.

(Sources: role names from content/*.md and docs/style-guide.md
("per design-lead", "task-lead owns that", "FRONTEND-DEV"); worktree/branch
names style-guide-doc, content-dev, frontend-dev; each branch has a
"review findings/feedback" fix commit before its merge.)

**Opittua:** Tyyliopas kirjoitettiin ja hyväksyttiin ennen kuin yhtään sivua
rakennettiin. Juuri se piti usean agentin työn yhtenäisenä: kun jokin oli
epäselvää, vastaus löytyi oppaasta eikä kenenkään arvauksesta.

**Tags:** HTML, CSS, Git
**Link:** https://github.com/Mireabdi/mireabdi.github.io
