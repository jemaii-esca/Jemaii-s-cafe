#!/usr/bin/env bash
# Creates the Laravel project and drops in the Jemaii's Cafe files.
set -e
cd "$(dirname "$0")"

if [ ! -d cafe-api ]; then
  composer create-project laravel/laravel cafe-api
fi
cd cafe-api

php artisan install:api --no-interaction || true

# copy our controllers, model, routes, migration and seeder
cp -r ../api-files/* .

# make sure the User model can create API tokens
if ! grep -q "HasApiTokens" app/Models/User.php; then
  sed -i 's/use HasFactory, Notifiable;/use HasApiTokens, HasFactory, Notifiable;/' app/Models/User.php
  sed -i 's/^use Illuminate\\Notifications\\Notifiable;/use Illuminate\\Notifications\\Notifiable;\nuse Laravel\\Sanctum\\HasApiTokens;/' app/Models/User.php
fi

# point Laravel at MySQL
sed -i 's/^DB_CONNECTION=.*/DB_CONNECTION=mysql/' .env
sed -i 's/^# *DB_HOST=.*/DB_HOST=127.0.0.1/; s/^DB_HOST=.*/DB_HOST=127.0.0.1/' .env
sed -i 's/^# *DB_PORT=.*/DB_PORT=3306/; s/^DB_PORT=.*/DB_PORT=3306/' .env
sed -i 's/^# *DB_DATABASE=.*/DB_DATABASE=jemaiis_cafe/; s/^DB_DATABASE=.*/DB_DATABASE=jemaiis_cafe/' .env
sed -i 's/^# *DB_USERNAME=.*/DB_USERNAME=cafe/; s/^DB_USERNAME=.*/DB_USERNAME=cafe/' .env
sed -i 's/^# *DB_PASSWORD=.*/DB_PASSWORD=cafe123/; s/^DB_PASSWORD=.*/DB_PASSWORD=cafe123/' .env

php artisan migrate:fresh --seed --force
echo ">> API ready. Start it with:  cd cafe-api && php artisan serve --host=0.0.0.0 --port=8000"
