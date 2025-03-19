# lebaba-ecommerce-starter-files
![lebaba-ecommerce-starter-files](/frontend/src/assets/github-cover.png)

## How to run this project:

### For Frontend 
Follow the below steps to run the project: 
- Firstly clone or unzip the project folder.
* Go to the frontend directory by using the following command ``` cd frontend ```.
+ Then run `` npm install `` commend to install node dependencies.
- Finally, to run the project, use ``npm run dev`` command.


### For Backend
Follow the below steps to run the project: 
- Firstly clone or unzip the project folder.
* Go to the backend directory by using the following command ``` cd backend```.
+ Then run `` npm install `` commend to install node dependencies.
* create a **.env** file in the backend root directory as the same level where the **package.json** is located and keep the following environment variables there: 
```
MONGODB_URL = '******'

JWT_SECRET_KEY = "******"

STRIPE_SECRET_KEY="******"

CLOUDINARY_CLOUD_NAME="****"
CLOUDINARY_API_KEY="*****"
CLOUDINARY_API_SECRET="******"

Note: Please setup mongodb and change the MongoDB url and set your jwt secret key above.
```

- Finally, to run the project, use ``npm run dev`` command.