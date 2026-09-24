# PROJECTS (projects.html) — Copy

Source: Helpdesk-Portfolio repo, 4 lab folders (01-Workstation-setup,
02-Active-directory, 03-Network-troubleshooting, 04-FileServices). Original
READMEs are in Finnish and screenshot-heavy; case studies below are written up
in English from their actual content, not from the one-line descriptions
currently on the live site.

Each case study has a short "ticket-style" metadata line (mono/UI-chrome
styling, per design-lead) above the title, then three parts: the
problem/scenario, what was built or done, and why it matters / what was
learned. Written for a non-technical reader, every technical term is paired
with a plain-language reason it matters.

**Humanizer pass (2026-09-24):** removed 32 em dashes from the prose (site's
original voice used none) and 7 repeated uses of "actually." Also swapped the
"X — Y" heading style (e.g. "the case — DNS misconfiguration",
"File Services — NTFS & Share Permissions") for a colon, for the same reason.
No facts, claims, or technical details changed.

**Translated to Finnish 2026-09-24** (owner request: site is Finnish-only for
now). All page copy below (labels, titles, prose, bullet lists) is now
Finnish; the case-by-case structure and English section labels ("Metadata
line:", "Problem / scenario:", etc.) are internal doc structure and stay as
they were, same as the rest of this file's process notes.

---

## Section intro

**Section label:** projektit

**Section note (Finnish page copy):**
Rakennettu VMwaressa Windows Server 2022:lla. Jokainen alla oleva labra on
dokumentoitu kuvakaappauksin ja vianselvitystapauksella: toimivaan
ympäristöön tuotiin tarkoituksella vika, joka sitten diagnosoitiin ja
korjattiin kuten oikealla tiketillä, ei vain suoritettuna tarkistuslistana.

---

## Case 01

**Metadata line (Finnish page copy):** `Tapaus 01 · Tila: Ratkaistu · Tekniikat: Windows 11 Pro, VMware, DNS`

**Title (Finnish page copy):** Työaseman käyttöönotto

**Problem / scenario (Finnish page copy):**
Uusi Windows 11 Pro -työasema pitää saada tyhjästä koneesta sellaiseksi,
että oikea käyttäjä voi kirjautua siihen turvallisesti: asennettuna,
päivitettynä, asianmukaisesti lukittuna, tilit oikein määriteltyinä ja
mukana jaettu kansio, jota ihmiset voivat käyttää. Kesken prosessin
koneeseen ilmaantui vika, joka on yksi yleisimmistä helpdesk-tiketeistä:
"internet ei toimi."

**What was built (Finnish page copy):**
- Windows 11 Pro asennettu puhtaana asennuksena, kone nimetty uudelleen ja
  määritetty paikallisella pääkäyttäjätilillä, VMware Tools asennettu ja
  Windows Update ajettu loppuun asti.
- Perussuojaus: reaaliaikainen virustorjunta ja palomuuri varmistettu
  aktiivisiksi kaikissa verkkoprofiileissa. (BitLocker-asemasalausta ei ollut
  saatavilla tässä virtuaaliympäristössä puuttuvan TPM-sirun vuoksi, mikä on
  labraympäristön rajoitus, ei piilotettu asia.)
- Kaksi tavallista käyttäjätiliä luotu, lisätty paikalliseen
  "Helpdesk-Local"-ryhmään ja tarkistettu, ettei kummallakaan ollut
  pääkäyttäjäoikeuksia. Perustava mutta tärkeä tietoturvatapa: älä jaa
  enempää oikeuksia kuin rooli vaatii.
- Jaettu kansio (`PublicDocs`) määritetty erillisillä jako- ja
  NTFS-oikeuksilla: kaikki pystyivät lukemaan sitä, Helpdesk-Local-ryhmä
  pystyi muokkaamaan tiedostoja siinä, ja toiminta testattiin kirjautumalla
  sisään tavallisena käyttäjänä ja tallentamalla tiedosto.
- Tulostustoiminto varmistettu tulostamalla testisivu Muistiosta ja
  tallentamalla tuloste PDF-muotoon sisäänrakennetulla Microsoft Print to
  PDF -toiminnolla.

**The case: DNS misconfiguration (Finnish page copy):**
Työasema pääsi internetiin IP-osoitteella (ping osoitteeseen 8.8.8.8 toimi
hyvin), mutta ei pystynyt avaamaan sivustoja tai tavoittamaan mitään nimellä.
Tämä ero (IP toimii, nimet eivät) viittaa suoraan DNS:ään, palveluun joka
muuttaa nimen kuten "google.com" osoitteeksi, jota tietokone voi käyttää.
Verkkosovittimen asetuksista löytyi manuaalisesti asetettu DNS-palvelimen
osoite, joka ei ollut oikea DNS-palvelin. Asetuksen palauttaminen
automaattiseksi (DHCP:n kautta) ja DNS-välimuistin tyhjentäminen korjasi
ongelman heti. Varmistettu onnistuneella pingillä ja `nslookup`-komennolla.

**Why it matters (Finnish page copy):**
"Internet ei toimi" on yksi yleisimmistä tiketeistä, joita helpdesk saa,
eikä se useinkaan ole yhteysongelma: kyse on DNS:stä. Se, että osaa testata
sekä IP-osoitteen että verkkotunnuksen, erottaa viiden minuutin korjauksen
hukatusta iltapäivästä väärän syyn perässä juoksemisessa.

---

## Case 02

**Metadata line (Finnish page copy):** `Tapaus 02 · Tila: Ratkaistu · Tekniikat: Windows Server 2022, Active Directory, Group Policy`

**Title (Finnish page copy):** Active Directory

**Problem / scenario (Finnish page copy):**
Useimmat organisaatiot eivät hallinnoi käyttäjätilejä ja käyttöoikeuksia yksi
kone kerrallaan. Ne käyttävät keskitettyä hakemistoa (Active Directory),
jotta IT voi luoda tilin kerran ja hallita, mihin sillä pääsee käsiksi
kaikkialla. Tämä labra rakentaa kyseisen hakemiston alusta asti: toimialueen
ohjauskoneen, jäsennellyn rakenteen tileille, siihen liitetyn työaseman ja
koko verkossa valvotun käytännön, sekä yhden yleisimmistä tiketeistä joita
service desk käsittelee.

**What was built (Finnish page copy):**
- Toimialueen ohjauskone (`DC01`, Windows Server 2022) määritetty kiinteällä
  verkkoasetuksella ja omalla DNS-palvelullaan, jolla isännöidään uutta
  toimialuetta (`mire.local`).
- Organisaatiorakenne (OU:t) joka erottelee käyttäjät, ryhmät, työasemat ja
  IT-hallinnon, rakennettu PowerShellillä toimialueen ohjauskoneella (jossa
  ei ole graafista käyttöliittymää). Tämä rakenne mahdollistaa sen, että
  ylläpitäjä voi myöhemmin ottaa käyttöön asetuksen "kaikille myynnissä" sen
  sijaan, että muokkaisi neljääkymmentä yksittäistä konetta.
- Toimialueen käyttäjätilit ja suojausryhmät luotu ja sijoitettu oikeaan
  rakenteeseen, jotta käyttöoikeuksia hallitaan ryhmäjäsenyyden kautta eikä
  yksitellen.
- Windows 11 -työasema liitetty toimialueeseen, DNS osoitettu toimialueen
  ohjauskoneeseen, ja toimialuetilin kirjautuminen testattu ja todettu
  toimivaksi.
- Group Policy joka estää tavallisia käyttäjiä avaamasta Ohjauspaneelia tai
  PC-asetuksia, otettu käyttöön kerran keskitetysti ja valvottu
  automaattisesti kaikilla soveltamisalueen koneilla.

**The case: account lockout (Finnish page copy):**
Käyttäjä ei päässyt kirjautumaan sisään. Virheilmoitus kertoi tilin olevan
lukittu. Näin käy, kun Active Directoryn lukitussääntö laukeaa liian monen
peräkkäisen epäonnistuneen kirjautumisyrityksen jälkeen. Tilin lukittu tila
varmistettiin Active Directory Users and Computers -työkalussa, tili
avattiin, ja kirjautuminen testattiin uudelleen onnistuneesti.

**Why it matters (Finnish page copy):**
Tilien lukittuminen on yksi yleisimmistä tikettityypeistä millä tahansa
service deskillä, yleensä helppo korjata, mutta vain jos tietää tarkalleen
mistä katsoa eikä arvaa. Tämä tapaus näyttää myös, miksi keskitetty
tilienhallinta on tärkeää: oletusarvoisesti kaikkia tilejä koskeva
lukitussääntö on tietoturvakontrolli, ei vain hankaluus. Tilin avaaminen
oikein, ei esimerkiksi tarpeettomalla salasanan nollauksella, estää toisen
ongelman syntymisen ensimmäistä korjattaessa.

---

## Case 03

**Metadata line (Finnish page copy):** `Tapaus 03 · Tila: Ratkaistu · Tekniikat: Windows Server 2022, DNS, DHCP`

**Title (Finnish page copy):** DNS & DHCP: verkon vianselvitys

**Problem / scenario (Finnish page copy):**
Jokainen verkon laite tarvitsee kaksi asiaa toimiakseen kunnolla: osoitteen
(jotta se löytyy) ja tavan muuttaa nimet osoitteiksi (jotta ihmisten ei
tarvitse muistaa numeroita). Tämä labra ottaa käyttöön molemmat palvelut
toimialueen ohjauskoneella ja varmistaa niiden toimivuuden, minkä jälkeen
käydään läpi tarkoituksella rikottu määritys diagnosoinnin
harjoittelemiseksi. Kyseessä on verkkopalveluversio samasta DNS-ongelmasta
kuin tapauksessa 01, mutta nyt palvelin- ja toimialuepuolelta eikä yhden
virheellisesti määritetyn koneen näkökulmasta.

**What was built (Finnish page copy):**
- DNS määritetty toimialueen ohjauskoneelle, mukaan lukien edelleenlähetykset
  (forwarders), jotta sisäiset käyttäjät voivat selvittää myös tavallisia
  internet-osoitteita, ei vain sisäisiä. Varmistettu `nslookup`-komennolla
  sekä sisäistä nimeä että internet-osoitetta vasten, sekä täydellä
  DNS-terveystarkistuksella (`dcdiag /test:dns`).
- DHCP asennettu ja määritetty osoitealueella (192.168.20.0/24), jotta
  verkon laitteet saavat IP-osoitteen, oletusyhdyskäytävän ja DNS-palvelimen
  automaattisesti ilman, että jokainen kone pitää määrittää käsin.
- Dynaaminen DNS-rekisteröinti määritetty niin, että kun työasema saa tai
  uusii IP-osoitteensa, se rekisteröityy automaattisesti DNS:ään, ilman
  manuaalista lisäystä. Varmistettu hakemalla työaseman oma isäntänimi.

**The case: wrong DNS server on a domain client (Finnish page copy):**
Työasema ei pystynyt selvittämään mitään sisäisiä toimialueen resursseja.
Työasemalle oli määritetty julkinen DNS-palvelin toimialueen ohjauskoneen
sijaan, hienovarainen mutta tärkeä ero, koska julkiset DNS-palvelimet eivät
edes tiedä, että yksityinen toimialue kuten `mire.local` on olemassa.
Työaseman osoittaminen takaisin toimialueen ohjauskoneen DNS-palveluun
korjasi nimenselvityksen heti, mikä varmistettiin komennoilla `ipconfig /all`
ja `nslookup`.

**Why it matters (Finnish page copy):**
DNS ja DHCP ovat ne kaksi palvelua, jotka saavat verkon "vain toimimaan"
ilman että käyttäjät huomaavat niitä, ennen kuin jokin menee pieleen,
jolloin kaikki jaetun aseman avaamisesta sisäisen sivuston tavoittamiseen
voi hiljaa hajota. Kun tunnistaa, että kyse on "väärästä DNS-palvelimesta,
ei rikkinäisestä verkosta", säästää aitoa vianselvitysaikaa, etenkin
toimialueympäristössä, jossa julkinen DNS ei yksinkertaisesti pysty
vastaamaan sisäisistä nimistä.

---

## Case 04

**Metadata line (Finnish page copy):** `Tapaus 04 · Tila: Ratkaistu · Tekniikat: Windows Server 2022, NTFS, SMB`

**Title (Finnish page copy):** Tiedostopalvelut: NTFS- ja jako-oikeudet

**Problem / scenario (Finnish page copy):**
Jaetut asemat ovat yksi yleisimmistä asioista, joita service desk tukee, ja
"en pääse kansioon" on yksi yleisimmistä tiketeistä. Tämä labra rakentaa
realistisen osaston tiedostonjakoympäristön (erilliset kansiot eri
tiimeille, oikeudet hallitaan ryhmien kautta yksittäisten käyttäjien
sijaan), minkä jälkeen käydään läpi access denied -virheen diagnosointi
oikealla tavalla.

**What was built (Finnish page copy):**
- Jaettu kansiorakenne luotu tiedostopalvelimelle ja julkaistu verkkoon
  SMB:n kautta nimellä `Departments`.
- Kaksi Active Directory -ryhmää (`HR_RW`, `IT_RW`) luotu nimenomaan
  käyttöoikeuksien hallintaan. Oikeudet myönnettiin vain ryhmille, ei
  koskaan yksittäisille henkilöille, mikä tekee pääsyn tarkastamisesta ja
  muuttamisesta helppoa myöhemmin (lisätään tai poistetaan joku ryhmästä
  sen sijaan, että oikeuksia muokattaisiin jokaisessa kansiossa erikseen).
- Jakotason oikeudet pidettiin yksinkertaisina ja niitä käytettiin vain
  jaon yleiseen näkyvyyteen; varsinainen käyttöoikeuksien hallinta
  hoidettiin erikseen NTFS-oikeuksilla kunkin osaston alikansiossa,
  yleinen käytännön malli joka pitää erillään "näetkö tämän
  olemassaolon" ja "pääsetkö käyttämään sitä".
- Osastojen alikansiot (HR, IT) lukittu niin, että vain vastaava ryhmä
  pystyi muokkaamaan tiedostoja, ja ylläpitäjillä säilyi täysi hallinta.
  Määritetty etänä RSAT:lla, koska tiedostopalvelin itse toimii ilman
  graafista käyttöliittymää (Server Core).

**The case: access denied to a department folder (Finnish page copy):**
Toimialueen käyttäjä näki jaetun aseman, mutta sai access denied -virheen
avatessaan HR-kansiota. Sen sijaan, että oikeuksia olisi muutettu heti (mikä
voi avata pääsyn liian laajasti tai rikkoa jotain muuta), ensin
tarkistettiin ryhmäjäsenyys, ja käyttäjä ei yksinkertaisesti ollut vielä
`HR_RW`-ryhmässä, vaikka kansion oikeudet olivat jo oikein. Käyttäjän
lisääminen ryhmään ja uudelleenkirjautuminen (jotta käyttöoikeustunnus
päivittyi) korjasi asian, ilman että varsinaiseen oikeusrakenteeseen
tehtiin yhtäkään muutosta.

**Why it matters (Finnish page copy):**
"Access denied" -tiketit ovat erittäin yleisiä, ja vaistomainen halu
muuttaa oikeuksia heti on yleensä väärä ensimmäinen liike: se on hitaampaa
ja riskialttiimpaa kuin sen tarkistaminen, kuka on missäkin ryhmässä. Tämä
tapaus kertoo diagnosointijärjestyksestä: tarkista yksinkertaisin,
turvallisin asia ensin, ennen kuin kosket määritykseen, josta muutkin ovat
riippuvaisia.

---

**Humanizer pass on Finnish text (2026-09-24):** fixed literal-translation
calques throughout (parallel-structure mismatches in list items, an
overloaded nominalization "eivät tiedä ... olemassaolosta" replaced with a
plain "että"-clause, "ne ovat väärin" replaced with the idiomatic "jokin
menee pieleen", a broken verb-noun combination "vaisto aloittaa ... on"
fixed to "vaistomainen halu muuttaa ... on", and a verb-conjugation error
"ennen kuin koskee" fixed to "ennen kuin kosket"). Also removed a repeated
"onnistuneella ... ja onnistuneella" and split one overlong sentence in
Case 03. No facts or technical details changed.
