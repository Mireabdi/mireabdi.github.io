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

## Projekti 01 — Tikettien luokittelija

**Metadata line:** Projekti 01 · Työtapa: suunnitelma ensin (superpowers) · Python

Komentorivityökalu, joka luokittelee helpdesk-tiketin kategoriaan, arvioi sen
kiireellisyyden ja hakee samankaltaiset aiemmat tiketit ratkaisuineen.
Työkalu näyttää aina, mitkä sanat ja signaalit päätökseen vaikuttivat, eikä
arvaa, jos se ei ole riittävän varma.

Rakensin sen superpowers-työnkululla: ensin suunnitteludokumentti, sitten
toteutussuunnitelma, testit ennen koodia (TDD) ja lopuksi oma worktree ja
pull request.

**Opittua:** Kun testasin työkalua demodatalla, osa vääristä tuloksista ei
johtunutkaan työkalusta vaan datasta: kolmen tiketin kiireellisyys oli
merkitty väärin. Opin, että myös testidata pitää tarkistaa, ennen kuin
syyttää koodia. (Source: helpdesk-triage commits fixing TICKET-0005, -0011,
-0023 urgency labels.)

**Tags:** Python, scikit-learn, pytest
**Link:** https://github.com/Mireabdi/helpdesk-triage

---

## Projekti 02 — Tämä sivusto

**Metadata line:** Projekti 02 · Työtapa: agent teams · HTML/CSS

Portfolioni uudistus yhden sivun versiosta monisivuiseksi sivustoksi,
rakennettuna yhden tyylioppaan pohjalta.

Työ jaettiin agent teams -toiminnolla: omat tiimiläiset sisällölle, ulkoasun
toteutukselle ja tyylioppaalle, jokainen omassa worktreessaan.

**Opittua:** Tyyliopas kirjoitettiin ja hyväksyttiin ennen kuin yhtään sivua
rakennettiin. Juuri se piti usean agentin työn yhtenäisenä: kun jokin oli
epäselvää, vastaus löytyi oppaasta eikä kenenkään arvauksesta.

**Tags:** HTML, CSS, Git
**Link:** https://github.com/Mireabdi/mireabdi.github.io
