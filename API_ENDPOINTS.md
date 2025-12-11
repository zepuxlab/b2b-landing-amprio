# API Endpoints Documentation

## Используемые API Endpoints

### 1. Форма отправки данных (Form Submission)
- **URL**: `https://office.ampriomilano.com/forms/b2blanding`
- **Метод**: `POST`
- **Content-Type**: `application/json`
- **Описание**: Отправка данных формы заявки
- **Конфигурация**: `API_CONFIG.FORM_SUBMIT_URL`
- **Переменная окружения**: `VITE_API_FORM_SUBMIT_URL` (опционально)

#### Request Body:
```json
{
  "name": "John Doe",
  "phone": "+971501234567",  // Номер телефона с кодом страны
  "company": "Company Name",  // Опционально
  "email": "john@example.com",
  "countryCode": "AE",
  "countryName": "United Arab Emirates",
  "privacyAccepted": true,
  "timestamp": "2025-01-15T10:30:00.000Z"  // Опционально
}
```

#### Response:
- **Success**: `200 OK` с JSON ответом
- **Error**: `4xx` или `5xx` с описанием ошибки

---

### 2. Список стран (Countries List)
- **URL**: `https://office.ampriomilano.com/forms/country`
- **Метод**: `GET`
- **Content-Type**: `application/json`
- **Описание**: Получение списка доступных стран с кодами и форматами телефонов
- **Конфигурация**: `API_CONFIG.COUNTRIES_URL`

#### Response:
```json
{
  "countries": [
    {
      "code": "AE",
      "name": "United Arab Emirates",
      "dialCode": "+971",
      "format": "00-000-0000",
      "placeholder": "00-000-0000",
      "flag": "🇦🇪"
    },
    // ... другие страны
  ],
  "defaultCountry": "AE"
}
```

---

## Внешние API для определения страны по IP

### 3. IP Geolocation - api.country.is
- **URL**: `https://api.country.is`
- **Метод**: `GET`
- **Описание**: Определение страны по IP адресу (основной сервис)
- **Response**:
```json
{
  "ip": "5.77.200.152",
  "country": "AM"
}
```

### 4. IP Geolocation - ipinfo.io
- **URL**: `https://ipinfo.io/json`
- **Метод**: `GET`
- **Описание**: Определение страны по IP адресу (резервный сервис #1)
- **Response**:
```json
{
  "ip": "5.77.200.152",
  "country": "AM",
  "city": "Yerevan",
  "region": "Yerevan",
  "loc": "40.1776,44.5126"
}
```

### 5. IP Geolocation - ipapi.co
- **URL**: `https://ipapi.co/json/`
- **Метод**: `GET`
- **Описание**: Определение страны по IP адресу (резервный сервис #2)
- **Response**:
```json
{
  "country_code": "AM",
  "country_name": "Armenia",
  // ... другие поля
}
```

---

## Конфигурация

Все API endpoints настроены в файле `src/config/api.ts`:

```typescript
export const API_CONFIG = {
  FORM_SUBMIT_URL: process.env.VITE_API_FORM_SUBMIT_URL || 'https://office.ampriomilano.com/forms/b2blanding',
  COUNTRIES_URL: 'https://office.ampriomilano.com/forms/country',
};
```

---

## Формат номера телефона

Номер телефона отправляется в формате: **`+[код страны][номер]`**

Примеры:
- UAE: `+971501234567`
- Russia: `+79161234567`
- USA: `+15551234567`

Код страны автоматически добавляется из выбранной страны в форме.

---

## Обработка ошибок

- Если определение страны по IP не работает, используется `defaultCountry` из API ответа
- Если API стран недоступен, используется fallback на UAE (AE)
- Все ошибки логируются в консоль браузера
