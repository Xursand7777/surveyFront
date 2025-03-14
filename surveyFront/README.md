# Loyihani o'rnatish uchun qo'llanma

## 📌 Kerakli Paketlar va Versiyalar

Ushbu loyihada ishlash uchun quyidagi bog‘liqliklar o‘rnatilgan bo‘lishi kerak:

### 🛠 Global O‘rnatilishi Kerak Bo‘lgan Vositalar

- **Node.js**: v18+ (Tavsiya etiladi: Eng so‘nggi LTS versiya)
- **Angular CLI**: 19.2 (`npm install -g @angular/cli@19.2`)

### 📦 Loyiha Bog‘liqliklari

Loyihada quyidagi paketlar o‘rnatilgan:

- **Angular**: 19.2
- **Tailwind CSS**: 3.4.17
- **NG Zorro**: 19.1.0

## 🚀 Loyiha Boshqaruvi

### Bog‘liqliklarni O‘rnatish

```sh
npm install
```

### Ishlab Chiqish Rejimida Loyihani Ishga Tushirish

```sh
ng serve
```

Brauzeringizda `http://localhost:4200/` sahifasiga o‘ting.

### Ishlab Chiqish Uchun Build Tayyorlash

```sh
ng build --configuration=production
```

## 📂 Loyiha Tuzilmasi

```
my-angular-app/
├── src/
│   ├── app/
│   ├── assets/
│   ├── environments/
│   ├── styles.css
│   ├── main.ts
│   └── index.html
├── angular.json
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## 🎯 Qo‘shimcha Buyruqlar

### Angular-ni Eng So‘nggi Versiyaga Yangilash

```sh
ng update @angular/core @angular/cli
```

### Qo‘shimcha Kutubxonalarni O‘rnatish (Ixtiyoriy)

Masalan, cdk:

```sh
npm install @angular/cdk @angular/animations
```

## ✅ Xulosa

Ishni boshlashdan oldin kerakli vositalarning o‘rnatilganligini tekshiring. Omad tilaymiz! 🎉
