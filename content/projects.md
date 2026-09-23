# PROJECTS (projects.html) — Copy

Source: Helpdesk-Portfolio repo, 4 lab folders (01-Workstation-setup,
02-Active-directory, 03-Network-troubleshooting, 04-FileServices). Original
READMEs are in Finnish and screenshot-heavy; case studies below are written up
in English from their actual content, not from the one-line descriptions
currently on the live site. helpdesk-triage is intentionally excluded per
owner decision.

Each case study has a short "ticket-style" metadata line (mono/UI-chrome
styling, per design-lead) above the title, then three parts: the
problem/scenario, what was built or done, and why it matters / what was
learned. Written for a non-technical reader — every technical term is paired
with a plain-language reason it matters.

---

## Section intro

**Section label:** projects

**Section note (carries over, lightly trimmed):**
Built in VMware on Windows Server 2022. Each lab below is documented with
screenshots and a real troubleshooting case — not just a checklist of steps
completed.

---

## Case 01

**Metadata line:** `Case 01 · Status: Resolved · Stack: Windows 11 Pro, VMware, DNS`

**Title:** Workstation Setup

**Problem / scenario:**
A new Windows 11 Pro workstation needs to go from a blank machine to something
a real user can safely log into — installed, updated, locked down, with
accounts set up correctly and a shared folder people can actually use. Partway
through, the machine developed a fault that's one of the most common helpdesk
tickets there is: "the internet doesn't work."

**What was built:**
- Clean install of Windows 11 Pro, machine renamed and set up with a local
  admin account, VMware Tools installed, Windows Update run to completion.
- Basic hardening: real-time antivirus protection and the firewall confirmed
  active on all network profiles. (BitLocker drive encryption wasn't available
  in this virtual environment due to a missing TPM chip — a limitation of the
  lab setup, noted rather than hidden.)
- Two standard user accounts created, added to a local "Helpdesk-Local" group,
  and checked to confirm neither had admin rights — a basic but important
  security habit: don't hand out more access than a role needs.
- A shared folder (`PublicDocs`) set up with separate share and NTFS
  permissions — Everyone could read it, the Helpdesk-Local group could edit
  files in it, and it was tested by actually logging in as a standard user and
  saving a file.
- Basic network printing configured and tested with a sample print job saved
  to PDF.

**The case — DNS misconfiguration:**
The workstation could reach the internet by IP address (a ping to 8.8.8.8
worked fine) but couldn't open any websites or reach anything by name. That
split — IP works, names don't — points straight at DNS, the service that
translates a name like "google.com" into an address a computer can actually
use. Checking the network adapter's settings showed the DNS server had been
manually set to an address that didn't exist. Resetting it to pull DNS
settings automatically (via DHCP) and clearing the DNS cache fixed it
immediately — confirmed with a successful ping and a successful `nslookup`.

**Why it matters:**
"The internet is down" is one of the most common tickets a helpdesk gets, and
it's very often not actually a connectivity problem — it's DNS. Knowing to
test both an IP address and a domain name is what separates a five-minute fix
from a wasted afternoon chasing the wrong cause.

---

## Case 02

**Metadata line:** `Case 02 · Status: Resolved · Stack: Windows Server 2022, Active Directory, Group Policy`

**Title:** Active Directory

**Problem / scenario:**
Most organizations don't manage user accounts and permissions one machine at a
time — they use a central directory (Active Directory) so IT can create an
account once and control what it can access everywhere. This lab builds that
directory from the ground up: a domain controller, an organized structure for
accounts, a workstation actually joined to it, and a policy enforced across
the network — plus one of the most common tickets a service desk handles.

**What was built:**
- A domain controller (`DC01`, Windows Server 2022) set up with a static
  network configuration and its own DNS service, hosting a new domain
  (`mire.local`).
- An organizational structure (OUs) separating users, groups, workstations,
  and IT administration — this is what lets an admin later apply a setting to
  "everyone in Sales" instead of editing forty individual machines.
- Domain user accounts and security groups created and placed into the right
  structure, so permissions are managed by group membership rather than
  one-by-one.
- A Windows 11 workstation joined to the domain, pointed at the domain
  controller for DNS, with a domain-account login tested and confirmed
  working.
- A Group Policy that blocks standard users from opening Control Panel or PC
  settings — applied once, centrally, and enforced automatically on every
  machine in scope.

**The case — account lockout:**
A user couldn't log in — the error said the account was locked. This happens
when Active Directory's lockout policy trips after too many failed login
attempts (commonly after a password reset, when the old password is still
saved somewhere). The account's locked status was confirmed in Active
Directory Users and Computers, unlocked, and the login retested successfully.

**Why it matters:**
Account lockouts are one of the highest-volume ticket types on any service
desk — usually simple to fix, but only if you know exactly where to look and
don't guess. This case also shows why centralized account management matters:
a lockout policy that applies to every account by default is a security
control, not just an inconvenience, and unlocking an account correctly (rather
than, say, resetting the password unnecessarily) avoids creating a second
problem while fixing the first.

---

## Case 03

**Metadata line:** `Case 03 · Status: Resolved · Stack: Windows Server 2022, DNS, DHCP`

**Title:** DNS & DHCP — Network Troubleshooting

**Problem / scenario:**
Every device on a network needs two things to work properly: an address (so
it can be found) and a way to translate names into addresses (so people don't
have to memorize numbers). This lab sets up both services on the domain
controller and validates them properly, then walks through a deliberately
broken configuration to practice diagnosing it — a network-services version of
the same DNS problem from Case 01, but from the server/domain side rather than
a single misconfigured PC.

**What was built:**
- DNS configured on the domain controller, including forwarders so internal
  users can also resolve normal internet addresses, not just internal ones.
  Verified with `nslookup` against both an internal name and an internet
  address, plus a full DNS health check (`dcdiag /test:dns`).
- DHCP installed and set up with an address pool (192.168.20.0/24) so devices
  on the network get an IP address, default gateway, and DNS server
  automatically instead of needing manual configuration on every machine.
- Dynamic DNS registration configured so that when a workstation gets or
  renews its IP address, it automatically registers itself in DNS — no manual
  entry needed. Verified by looking up the workstation's own hostname.

**The case — wrong DNS server on a domain client:**
A workstation couldn't resolve any internal domain resources. The workstation
had a public DNS server configured instead of the domain controller — a
subtle but important distinction, because public DNS servers have no idea a
private domain like `mire.local` even exists. Pointing the workstation back at
the domain controller's DNS service fixed the resolution immediately,
confirmed with `ipconfig /all` and `nslookup`.

**Why it matters:**
DNS and DHCP are the two services that make a network "just work" without
users noticing them — until they're wrong, at which point everything from
opening a shared drive to reaching an internal website can quietly break.
Recognizing "wrong DNS server, not a broken network" is a distinction that
saves real troubleshooting time, especially in a domain environment where
public DNS simply cannot answer for internal names.

---

## Case 04

**Metadata line:** `Case 04 · Status: Resolved · Stack: Windows Server 2022, NTFS, SMB`

**Title:** File Services — NTFS & Share Permissions

**Problem / scenario:**
Shared drives are one of the most common things a service desk supports, and
"I can't get into the folder" is one of the most common tickets. This lab
builds a realistic department file-sharing setup — separate folders for
different teams, permissions handled through groups rather than individual
users — then walks through diagnosing an access-denied error the right way.

**What was built:**
- A shared folder structure created on the file server and published to the
  network over SMB as `Departments`.
- Two Active Directory groups (`HR_RW`, `IT_RW`) created specifically to
  control access — permissions were granted only to groups, never to
  individual people, which is what makes access easy to audit and change later
  (add or remove someone from a group, rather than editing permissions on
  every folder).
- Share-level permissions kept simple and only used for general visibility of
  the share; the real access control was handled separately through NTFS
  permissions on each department's subfolder — a standard real-world pattern
  that keeps "can you see this exists" separate from "can you actually use
  it."
- Department subfolders (HR, IT) each locked down so only their matching
  group could modify files, with administrators retaining full control.
  Configured remotely with RSAT, since the file server itself runs without a
  graphical interface (Server Core).

**The case — access denied to a department folder:**
A domain user could see the shared drive but got an access-denied error
opening the HR folder. Rather than immediately changing permissions (which
risks opening access too widely or breaking something else), the group
membership was checked first — and the user simply wasn't in the `HR_RW`
group yet, even though the folder's permissions were already correct. Adding
the user to the group and having them log in again (so their access token
picked up the change) fixed it, with zero changes made to the actual
permission structure.

**Why it matters:**
"Access denied" tickets are extremely common, and the instinct to immediately
start changing permissions is usually the wrong first move — it's slower and
riskier than checking who's actually in which group. This case is really
about diagnostic order: check the simplest, safest thing first before
touching a configuration that other people also depend on.
