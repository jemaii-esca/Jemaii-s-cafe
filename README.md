# ☕ Jemaii's Cafe: CCIT 01 Final Output 1

React + Tailwind (frontend) · Laravel API (backend) · MySQL (database)

## Folder contents
- `api-files/`  Laravel files (controllers, model, routes, migration, seeder)
- `web/`        Complete React + Tailwind app
- `1-setup-database.sh`, `2-setup-api.sh`, `3-setup-web.sh`  one-time setup scripts

## A. On GitHub Codespaces
1. Create a repo, then a Codespace. Upload this zip (drag it into the Explorer) and run:
   ```bash
   unzip jemaiis-cafe.zip && cd jemaiis-cafe
   ```
2. One-time setup:
   ```bash
   bash 1-setup-database.sh
   bash 2-setup-api.sh
   bash 3-setup-web.sh
   ```
3. Start the API (terminal 1):
   ```bash
   cd cafe-api && php artisan serve --host=0.0.0.0 --port=8000
   ```
4. Make port 8000 public (terminal 2), then start the website:
   ```bash
   gh codespace ports visibility 8000:public -c $CODESPACE_NAME
   cd web && npm run dev
   ```
   (Or open the **Ports** tab, right-click 8000 → Port Visibility → Public.)
5. Open the forwarded **5173** URL from the Ports tab.

## B. On Android (Termux)
```bash
pkg update -y && pkg install -y php composer nodejs git unzip zip nano
cd ~/storage/downloads   # after running termux-setup-storage
unzip jemaiis-cafe.zip && cd jemaiis-cafe
bash 1-setup-database.sh && bash 2-setup-api.sh && bash 3-setup-web.sh
```
Then use 2 sessions:
- `cd cafe-api && php artisan serve --host=127.0.0.1 --port=8000`
- `cd web && npm run dev`

Open `http://127.0.0.1:5173` in Chrome (not `localhost`).
If you restart Termux, start MySQL first: `mysqld_safe --datadir=$PREFIX/var/lib/mysql &`

## Pages
Home `/` · Login `/login` · Signup `/signup` · Dashboard `/dashboard` · Products `/products`

## Checklist
- All four pages reachable from the nav
- Signup/login read and write the `users` table
- Add, edit, delete on Products persists in MySQL

Check the database:
```bash
mariadb -u cafe -pcafe123 jemaiis_cafe -e "SELECT * FROM users; SELECT id,name,price,stock FROM products;"
```
