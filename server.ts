import express from "express";
import cors from "cors"
import bodyParser from "body-parser";
import appointmentsController from "./app/routers/appointments/appointmentRoutes";
import { connectDB } from "./app/db/config";

const app = express()
const port = 5001

app.use(cors())
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
  
connectDB()
appointmentsController(app);