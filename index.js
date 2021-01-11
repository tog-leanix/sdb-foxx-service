"use strict";
const createRouter = require("@arangodb/foxx/router");
const { query, db } = require("@arangodb");

const carsCollection = db._collection("cars");
const router = createRouter();
module.context.use(router);

router
  .get("/", (req, res) => {
    res.write("Hello You!");
  })
  .response(["text/plain"]);

router
  .get("/getAllCarsByColor/:color", (req, res) => {
    const time = new Date().getTime();
    const color = req.pathParams.color;
    const cars = query`
    FOR car IN ${carsCollection}
      FILTER car.color==${color}
      RETURN car
    `.toArray();

    res.json({
      delta: new Date().getTime() - time,
      cars,
    });
  })
  .response(["application/json"]);

router
  .get("/getCarByID/:id", (req, res) => {
    const id = req.pathParams.id;

    const timeQuery = new Date().getTime();
    const car = query`
    FOR car IN ${carsCollection}
      FILTER car._key==${id}
      RETURN car
    `.toArray()[0];
    const deltaQuery = new Date().getTime() - timeQuery;

    const timeKey = new Date().getTime();
    const carKey = carsCollection.document(id);
    const deltaKey = new Date().getTime() - timeKey;

    res.json({
      query: {
        delta: deltaQuery,
        car,
      },
      keyValue: {
        delta: deltaKey,
        car: carKey,
      },
      test: Date.now(),
    });
  })
  .response(["application/json"]);

router
  .get("/getModelStatisticOnAccidents/:model", (req, res) => {
    const model = req.pathParams.model;

    const timeQuery = new Date().getTime();
    const models = query`
    LET carIDs = (
      FOR car in cars
          FILTER car.model == ${model}
          RETURN car._id
    )

    FOR e in event
        FILTER e._from IN carIDs
        LET car = DOCUMENT(e._to)
        COLLECT model = car.model WITH COUNT INTO modelCount
        RETURN {model: model, count: modelCount}  
    `.toArray();
    const deltaQuery = new Date().getTime() - timeQuery;

    res.json({
      query: {
        delta: deltaQuery,
        models,
      },
    });
  })
  .response(["application/json"]);
