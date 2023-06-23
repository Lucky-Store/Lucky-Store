require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dalleRoutes = require("./routes/dalle.routes");
const userRoutes = require("./routes/user.routes");
const productRoutes = require("./routes/product.routes");

const app = express();
mongoose
  .connect(
    "mongodb+srv://storewebproject:23122002@cluster0.0upsyvd.mongodb.net/Store1?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    // listening for requests
    app.listen(3000, () => {
      console.log(`connected to db and listening on port 3000`);
    });
  })
  .catch((err) => console.log(err));

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/api/v1/dalle", dalleRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/", productRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello from DALL.E" });
});
