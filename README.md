# Laravel SaaS

Laravel SaaS is a Software as a Service platform designed to provide efficient application management solutions. Laravel SaaS integrated Midtrans as its payment gateway, allowing users to easily add credits to their accounts. This secure and fast payment system ensures a smooth and reliable transaction experience for all users.

## Tech Stack

- **Laravel 11**
- **Laravel Breeze**
- **MySQL Database**
- **Inertia - ReactJS**
- **TailwindCSS**
- **daisyUI**
- **Midtrans**

## Features

- Main features available in this application:
  - SaaS
  - Payment Gateway

## Installation

Follow the steps below to clone and run the project in your local environment:

1. Clone repository:

    ```bash
    git clone https://github.com/Akbarwp/Laravel-SaaS.git
    ```

2. Install dependencies use Composer and NPM:

    ```bash
    composer install
    npm install
    ```

3. Copy file `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

4. Generate application key:

    ```bash
    php artisan key:generate
    ```

5. Setup database and Midtrans key in the `.env` file:

    ```plaintext
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel_saas
    DB_USERNAME=root
    DB_PASSWORD=
    ```

    ```plaintext
    MIDTRANS_CLIENT_KEY={YOUR_CLIENT_KEY}
    MIDTRANS_SERVER_KEY={YOUR_SERVER_KEY}
    ```

6. Run migration database:

    ```bash
    php artisan migrate
    ```

7. Run website:

    ```bash
    npm run dev
    php artisan serve
    ```

## Screenshot

- ### **Dashboard**

<img src="https://github.com/user-attachments/assets/de38a299-1381-4fc5-ba78-8b7e5cf541fa" alt="Halaman Dashboard" width="" />
<br><br>

- ### **Feature**

<img src="https://github.com/user-attachments/assets/1b8e773c-7346-480e-b5b0-5068cb1b5e60" alt="Halaman Fitur" width="" />
<br><br>

- ### **Buy Credits**

<img src="https://github.com/user-attachments/assets/1424471c-20f5-4ee8-9b54-a6097774d9c5" alt="Halaman Pembelian Kredit" width="" />
<br><br>

- ### **Payment**

<img src="https://github.com/user-attachments/assets/45b2a4a9-b89a-4539-8c38-778192b332dd" alt="Halaman Pembayaran Xendit" width="" />
<br><br>
