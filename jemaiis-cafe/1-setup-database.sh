#!/usr/bin/env bash
# Installs/starts MySQL (MariaDB) and creates the jemaiis_cafe database + user.
set -e

SQL="CREATE DATABASE IF NOT EXISTS jemaiis_cafe;
CREATE USER IF NOT EXISTS 'cafe'@'localhost' IDENTIFIED BY 'cafe123';
CREATE USER IF NOT EXISTS 'cafe'@'127.0.0.1' IDENTIFIED BY 'cafe123';
GRANT ALL ON jemaiis_cafe.* TO 'cafe'@'localhost';
GRANT ALL ON jemaiis_cafe.* TO 'cafe'@'127.0.0.1';
FLUSH PRIVILEGES;"

if [[ "$PREFIX" == *"com.termux"* ]]; then
  echo ">> Termux detected"
  pkg install -y mariadb
  [ -d "$PREFIX/var/lib/mysql/mysql" ] || mariadb-install-db
  (mysqld_safe --datadir="$PREFIX/var/lib/mysql" > /dev/null 2>&1 &)
  sleep 8
  mariadb -e "$SQL"
else
  echo ">> Linux / Codespaces detected"
  sudo apt-get update
  sudo apt-get install -y mariadb-server
  sudo service mariadb start
  sleep 3
  sudo mariadb -e "$SQL"
fi
echo ">> Database ready: jemaiis_cafe (user: cafe / password: cafe123)"
