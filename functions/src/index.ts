import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp(functions.config().firebase);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.warn("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const registro = functions.https.onRequest((request, response) => {
  // condicionar datos en el cuerpo de la petición.
  admin.firestore().collection("images").add({
    imagebase64: request.query.bytesbase64, // Obtener valor desde parametro
  }).then((e) => {
    functions.logger.info(e);
    response.setHeader("Content-Type", "application/json");
    response.send(JSON.stringify({"msg": "Inserción correcta"}));
  }).catch((error) => {
    functions.logger.error(error);
    response.setHeader("Content-Type", "application/json");
    response.send(JSON.stringify({"msg": "Inserción incorrecta"}));
  });
});

export const registro2 = functions.https.onRequest((request, response) => {
  // condicionar datos en el cuerpo de la petición.
  admin.firestore().collection("images").add({
    imagebase64: request.body.bytesbase64, // Obtener valor desde body
  }).then((e) => {
    functions.logger.info(e);
    response.setHeader("Content-Type", "application/json");
    response.send(JSON.stringify({"msg": "Inserción correcta"}));
  }).catch((error) => {
    functions.logger.error(error);
    response.setHeader("Content-Type", "application/json");
    response.send(JSON.stringify({"msg": "Inserción incorrecta"}));
  });
});

export const registrojson = functions.https.onRequest((request, response) => {
  functions.logger.info(request.body);
  const date = new Date();
  response.setHeader("Content-Type", "application/json");
  admin.firestore().collection("user").add({
    user: request.body.user,
    link: request.body.link,
    year: request.body.year,
    roles: request.body.roles,
    date_insert: date,
  }).then((resp) => {
    functions.logger.info(resp);
    response.send(JSON.stringify({"msg": "Inserción correcta"}));
  }).catch((error) => {
    functions.logger.error(error);
    response.send(JSON.stringify({"msg": "Inserción incorrecta"}));
  });
});

export const getUserInfo = functions.https.onRequest((request, response) => {
  response.setHeader("Content-Type", "application/json");
  const userid = request.body.userid;
  admin.firestore().collection("user").where(
      "user",
      "==",
      userid
  ).get().then((e) => {
    functions.logger.info(e);
    const dataArr: FirebaseFirestore.DocumentData[] = [];
    e.forEach((element) => {
      dataArr.push(element.data());
    });
    response.send(JSON.stringify({
      "status": "ok",
      "msg": "algún mensaje",
      "obj": dataArr,
    }));
  }).catch((error) => {
    functions.logger.error(error);
    response.send(JSON.stringify({
      "status": "ok",
      "msg": "Ocurrió un error",
    }));
  });
});

export const evidenciaapp = functions.https.onRequest((request, response) => {
  functions.logger.info(request.body);
  const date = new Date();
  response.setHeader("Content-Type", "application/json");
  admin.firestore().collection("appflutter").add({
    title: request.body.title,
    description: request.body.description,
    base64img: request.body.base64img,
    latitude: request.body.latitude,
    longitude: request.body.longitude,
    date_insert: date,
  }).then((resp) => {
    functions.logger.info(resp);
    response.send(JSON.stringify({"msg": "Inserción correcta"}));
  }).catch((error) => {
    functions.logger.error(error);
    response.send(JSON.stringify({"msg": "Inserción incorrecta"}));
  });
});
