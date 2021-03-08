## EzMessageManager

The backend was built with [Strapi](https://strapi.io/), an open source headless CMS.  This configureation requires have a database setup that the backend can connect to and load all the tables.

***Update Environment Variables***

Rename .env.example to .env

     ADMIN_JWT_SECRET=
     STRAPI_URL=
 
     EMAIL_FROM=
     MAIL_TRAP_USER=
     MAIL_TRAP_USER_PASS_WORD=
 
     DATABASE_HOST=
     DATABASE_NAME=
     DATABASE_USERNAME=
     DATABASE_PASSWORD=
     DATABASE_PORT=

 Update variables to you own credentials

***Install Dependencies***

    yarn
  
***Launch Strapi***

     yarn develop

 Stapi will launch in your web browser with a registration form to create your admin account

http://localhost:1337/

## Setting Permissions

Once you have logged into strapi go to “Settings” on the left navigation bar.

Under “USERS & PERMISSIONS PLUGIN” select “Roles”

 By default there are two roles:

 1. Authenticated
 2. Public

### Authenticated

Under “Authenticated” for “Permissions” in the “APPLICATION” section, select each table and mark all the checkboxes.

 - CONTACT-LIST
 - EMAIL-LOGS
 - EMAIL-SCHEDULES
 - EMAIL-TEMPLATES
 - EMP
 - EMPLOYEES
 - MAIL
 - SLACK-SCHEDULES
 - TAGS
 - EMPLOYEE-META-FIELDS
 - EMPLOYEE-META-DATA

  Under “Authenticated” for “Permissions” in the “UPLOAD” section ensure the “Upload” checkbox is selected

  Under “Authenticated” for “Permissions” in the “ USER-PERMISSIONS” section ensure the following are checked

  **AUTH**
 - callback 
 - connect
 - emailconfirmation 
 - forgotpassword 
 - register
 - resetpassword

**USER**
 - me

### Public

Under “Public” for “Permissions” in the “APPLICATION” section, check the following boxes:

  **CONTACT-LIST**
 - find
 - findone

  **EMAIL-SCHEDULES**
 - find
 - findone
 - update

**SLACK-SCHEDULES**
 - find
 - findone
 - update

 **EMAIL-LOGS**
 - create
 - find
 - findone
 - update

**EMAIL-TEMPLATES**
 - findone  

**EMP**
 - index

**EMPLOYEES**

 - find
 - findone

## Configure CORS

Ensure that your frontend URL and Cron URLs are added to your CORS safe list for your production and development environments

 - /config/env/development/middleware.js
 - /config/env/production/middleware.js
