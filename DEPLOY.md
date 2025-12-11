# Инструкция по деплою B2B Landing Page

## Сервер настроен ✅

- **Папка для сайта**: `/home/ec2-user/officeamprio/b2b`
- **URL**: `https://office.ampriomilano.com/b2b`
- **Nginx**: настроен и перезагружен

## Шаги для деплоя

### 1. Сборка проекта

```bash
npm run build
```

### 2. Деплой на сервер

#### Вариант A: Использовать скрипт деплоя

```bash
./deploy.sh
```

#### Вариант B: Ручной деплой

```bash
# Загрузить файлы на сервер
rsync -avz --delete \
    --exclude '.git' \
    --exclude 'node_modules' \
    dist/ \
    amprio:~/officeamprio/b2b/

# Установить права
ssh amprio "sudo chown -R ec2-user:ec2-user ~/officeamprio/b2b && chmod -R 755 ~/officeamprio/b2b"
```

### 3. Проверка

После деплоя проверьте:
- https://office.ampriomilano.com/b2b - главная страница
- https://office.ampriomilano.com/b2b/privacy-policy - страница политики
- https://office.ampriomilano.com/b2b/thank-you - страница благодарности

## Настройка API

Форма готова к отправке данных на API. Для настройки:

1. Откройте файл `src/config/api.ts`
2. Укажите URL API endpoint в переменной `FORM_SUBMIT_URL`
3. Или создайте файл `.env` с переменной:
   ```
   VITE_API_FORM_SUBMIT_URL=https://office.ampriomilano.com/api/b2b/form
   ```

## Структура данных формы

Форма отправляет следующие данные:

```typescript
{
  name: string;
  phone: string;
  company?: string;
  email: string;
  countryCode: string;
  countryName: string;
  privacyAccepted: boolean;
  timestamp: string;
}
```

## Nginx конфигурация

Конфигурация находится в `/etc/nginx/conf.d/office.conf`:

```nginx
location /b2b {
    alias /home/ec2-user/officeamprio/b2b;
    try_files $uri $uri/ /b2b/index.html;
    index index.html;
    
    # Кеширование статических файлов
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|webp|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        access_log off;
    }
    
    # Без кеша для HTML
    location ~* \.html$ {
        expires -1;
        add_header Cache-Control "no-cache, no-store, must-revalidate";
    }
}
```

## Полезные команды

```bash
# Проверить конфигурацию nginx
ssh amprio "sudo nginx -t"

# Перезагрузить nginx
ssh amprio "sudo systemctl reload nginx"

# Посмотреть логи nginx
ssh amprio "sudo tail -f /var/log/nginx/office.ampriomilano.com.error.log"

# Проверить права доступа
ssh amprio "ls -la ~/officeamprio/b2b"
```
