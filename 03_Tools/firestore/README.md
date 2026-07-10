# Firestore Security Rules

`firestore.rules` in diesem Ordner ist die Quelle der Wahrheit für die Firestore-Regeln des Projekts `fretze-pumpt`. Es wird von keinem Tooling in diesem Repo automatisch deployed (bewusst kein `firebase-tools`/npm, um die Null-Build-Tooling-Philosophie des Projekts nicht zu durchbrechen) — bei jeder Änderung manuell in der Firebase Console einfügen: **Firestore Database → Rules → Text ersetzen → Publish**.
