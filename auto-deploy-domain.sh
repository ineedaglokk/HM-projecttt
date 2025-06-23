#!/bin/bash

# 🚀 Автодеплой Хачапури Марико с постоянным доменом

set -e  # Выход при ошибке

SERVER="root@85.198.83.72"
BOT_DIR="~/hachapuri-bot"
WEB_DIR="/var/www/html"
DOMAIN="https://ineedaglokk.ru"

echo "🍴 === АВТОДЕПЛОЙ ХАЧАПУРИ МАРИКО (ДОМЕН) ==="
echo ""
echo "🌐 Используем постоянный домен: $DOMAIN"
echo ""

# 1. СБОРКА ФРОНТЕНДА
echo "📦 1. Собираем фронтенд..."
npm run build

# 2. ДЕПЛОЙ ФРОНТЕНДА
echo "🚀 2. Деплоим фронтенд на сервер..."
rsync -avz --delete dist/ $SERVER:$WEB_DIR/

# 3. ПОДГОТОВКА БОТА
echo "🤖 3. Подготавливаем бота с постоянным доменом..."

# Создаем .env файл для бота с постоянным URL
cat > bot/.env << EOF
BOT_TOKEN=$BOT_TOKEN
WEBAPP_URL=$DOMAIN
NODE_ENV=production
EOF

echo "✅ Конфигурация бота создана с URL: $DOMAIN"

# 4. ДЕПЛОЙ БОТА
echo "🚀 4. Деплоим бота на сервер..."

# Останавливаем бот
ssh $SERVER "pm2 stop hachapuri-bot 2>/dev/null || true"

# Создаем директорию если не существует
ssh $SERVER "mkdir -p $BOT_DIR"

# Загружаем файлы бота
scp bot/main-bot.cjs bot/package.json bot/.env $SERVER:$BOT_DIR/

# Обновляем зависимости
ssh $SERVER "cd $BOT_DIR && npm install"

# 5. ЗАПУСК БОТА
echo "▶️  5. Запускаем бота..."
ssh $SERVER "cd $BOT_DIR && pm2 start main-bot.cjs --name hachapuri-bot || pm2 restart hachapuri-bot"

# 6. НАСТРОЙКА АВТОЗАПУСКА
echo "⚙️  6. Настраиваем автозапуск..."
ssh $SERVER "pm2 save && pm2 startup systemd -u root --hp /root 2>/dev/null || true"

# 7. ПРОВЕРКА СТАТУСА
echo "✅ 7. Проверяем статус..."
echo ""
echo "📊 Статус PM2:"
ssh $SERVER "pm2 list"
echo ""
echo "🌐 URL приложения: $DOMAIN"
echo "🤖 Бот: @HachapuriMarico_BOT"
echo ""

# 8. ПОКАЗ ЛОГОВ
echo "📋 Логи бота (последние 5 строк):"
ssh $SERVER "pm2 logs hachapuri-bot --lines 5 --nostream 2>/dev/null || echo 'Логи пока недоступны'"

echo ""
echo "🎉 === ДЕПЛОЙ ЗАВЕРШЕН ==="
echo ""
echo "🔧 Полезные команды:"
echo "   • Логи бота: ssh $SERVER 'pm2 logs hachapuri-bot'"
echo "   • Рестарт бота: ssh $SERVER 'pm2 restart hachapuri-bot'"
echo "   • Статус: ssh $SERVER 'pm2 list'"
echo "   • Проверка сайта: curl -I $DOMAIN"
echo ""
echo "✨ Больше никаких проблем с меняющимися URL!"
echo "" 