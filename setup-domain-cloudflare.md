# 🌐 Настройка домена ineedaglokk.ru через Cloudflare Tunnel

## Что нужно сделать

### 1. Настройка в Cloudflare Dashboard

1. **Добавить домен в Cloudflare:**
   - Зайти на https://dash.cloudflare.com/
   - Добавить сайт `ineedaglokk.ru`
   - Изменить NS записи у регистратора на Cloudflare NS

2. **Создать именованный туннель:**
   ```bash
   # На сервере установить cloudflared (если еще не установлен)
   curl -L --output cloudflared.deb https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64.deb
   sudo dpkg -i cloudflared.deb
   
   # Авторизоваться в Cloudflare
   cloudflared tunnel login
   
   # Создать именованный туннель
   cloudflared tunnel create hachapuri-mariko
   
   # Настроить маршрутизацию
   cloudflared tunnel route dns hachapuri-mariko ineedaglokk.ru
   ```

3. **Создать конфигурационный файл:**
   ```bash
   # На сервере создать ~/.cloudflared/config.yml
   ssh root@85.198.83.72 "mkdir -p ~/.cloudflared"
   ```

   Содержимое config.yml:
   ```yaml
   tunnel: hachapuri-mariko
   credentials-file: /root/.cloudflared/<tunnel-id>.json
   
   ingress:
     - hostname: ineedaglokk.ru
       service: http://127.0.0.1:80
     - hostname: www.ineedaglokk.ru
       service: http://127.0.0.1:80
     - service: http_status:404
   ```

4. **Запустить туннель как сервис:**
   ```bash
   # Установить как системный сервис
   ssh root@85.198.83.72 "cloudflared service install"
   ssh root@85.198.83.72 "systemctl start cloudflared"
   ssh root@85.198.83.72 "systemctl enable cloudflared"
   ```

### 2. Обновить скрипт автодеплоя

После настройки туннеля можно использовать упрощенный скрипт:

```bash
chmod +x auto-deploy-domain.sh
export BOT_TOKEN="ваш_токен"
./auto-deploy-domain.sh
```

## Преимущества этого подхода

✅ **Постоянный URL** - https://ineedaglokk.ru  
✅ **Автоматический HTTPS** - сертификат от Cloudflare  
✅ **DDoS защита** - встроенная защита Cloudflare  
✅ **Глобальный CDN** - быстрая загрузка по всему миру  
✅ **Никаких портов** - работает через 80/443  
✅ **Простота** - один раз настроил и забыл  

## Проверка работы

После настройки:
1. Домен должен резолвиться: `nslookup ineedaglokk.ru`
2. Сайт должен открываться: `curl -I https://ineedaglokk.ru`
3. Бот должен работать с постоянным URL

## Альтернатива: прямая настройка

Если не хотите Cloudflare, можно настроить прямое подключение:
- A-запись: ineedaglokk.ru → 85.198.83.72
- Настроить Let's Encrypt SSL
- Открыть порты 80/443 на сервере 