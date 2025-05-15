# Savchuk Dmytro IPZk-24-1
# Front-end part 


# QR Code Generator & Reader

Це фронт-енд частина додатку для генерації та зчитування QR-кодів з додатковими можливостями редагування зовнішнього вигляду та завантаження логотипу.

## 📦 Завантаження Збірки

Збілджену версію додатку під десктоп  можна завантажити за посиланням:

🔗 **[Завантажити готовий додаток](https://drive.google.com/file/d/1IqJQCkU2xuzFCtgYhpZUQDD9ArS5xWHz/view)**  

*Вимоги для запуску: .NET 9*

---

## ⚙️ Функціональність

- Генерація QR-кодів на основі введеного URL
- Налаштування зовнішнього вигляду QR (кольори, бордер, заокруглення)
- Завантаження логотипу у QR-код
- Завантаження згенерованого зображення
- Зчитування QR-кодів із зображення (drag & drop / paste / upload)
- Статистика генерації QR-кодів (відправка на бекенд)
- Кросплатформа (браузер, десктоп, мобільні пристрої)

---


---

## 🧭 Programming Principles

У процесі розробки проєкту були застосовані такі принципи програмування:

1. **Single Responsibility Principle (SRP)**  
   Кожен клас і сервіс відповідає лише за одну задачу. Наприклад, `QrcodeService` відповідає лише за взаємодію з API QR-кодів, а `StatisticsService` – за надсилання статистичних даних.

2. **Don't Repeat Yourself (DRY)**  
   Повторюваний код винесено в сервіси (`CrudService`, `QrcodeService`). Наприклад, базові CRUD-операції реалізовано централізовано у `CrudService`.

3. **Separation of Concerns (SoC)**  
   Логіка відображення відділена від логіки обробки даних. Компоненти (`QrGeneratorComponent`, `QrReaderComponent`) лише взаємодіють з сервісами і не містять логіки HTTP-запитів.

4. **Open/Closed Principle (OCP)**  
   Система розширювана без потреби змінювати існуючий код. Наприклад, легко додати нові параметри до генерації QR без зміни логіки `QrcodeService`.

5. **KISS (Keep It Simple, Stupid)**  
   Рішення реалізовано максимально просто. Використано стандартні Angular механізми (форми, сервіси, події), без ускладнення структури.

---

## 🛠 Refactoring Techniques

У коді застосовано наступні техніки рефакторингу для покращення структури та підтримуваності:

- **Extract Method**  
  Метод `renderFinalCanvas()` винесено для зменшення складності `downloadImage()`.

- **Rename Variable for Clarity**  
  Наприклад, `urlValue` чітко вказує на зміст змінної — URL, який вводить користувач.

- **Encapsulate Conditionals**  
  Перевірки умов винесено в окремі функції (`clearMessages()`, `showToast()`), що спрощує `onSubmit()` та `onRegenerate()`.

- **Use Observable Composition**  
  Використано RxJS (`catchError`, `pipe`) для обробки асинхронних подій і помилок у `QrReaderComponent`.

- **Move Logic to Service**  
  Вся взаємодія з API винесена в сервіси (`QrcodeService`, `StatisticsService`) – зменшено навантаження на компоненти.

---

## 🎯 Design Patterns

У проекті реалізовано кілька ключових шаблонів проєктування:

- **Service Pattern**  
  Angular-сервіси (`QrcodeService`, `CrudService`, `StatisticsService`) інкапсулюють логіку роботи з API.

- **Facade Pattern**  
  `CrudService` слугує фасадом для спрощення доступу до HTTP-запитів – всі CRUD операції централізовано в одному класі.

- **Observer Pattern**  
  Використання RxJS Observable забезпечує підписку на події та реакцію на зміну стану (наприклад, при отриманні результату з API).

- **Dependency Injection**  
  Angular DI використовується для впровадження сервісів у компоненти, що дозволяє легко замінювати та тестувати залежності.

- **Module Pattern**  
  Ізольовані компоненти (`QrGeneratorComponent`, `QrReaderComponent`) реалізовані як standalone-компоненти, що підвищує модульність.

  
## 🚀 Запуск локально

### Вимоги:
- Node.js ≥ 20
- Angular CLI

### Кроки:

```bash
git clone 
npm install
ng serve
```


---

