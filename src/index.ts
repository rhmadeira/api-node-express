import { Knex } from "./server/database/knex";
import { server } from "./server/server";

const startServer = async () => {
  server.listen(process.env.PORT || 3333, () =>
    console.log(`App is running! 🚀 in PORT: ${process.env.PORT || 3333}`)
  );
};

if (process.env.NODE_ENV === "production") {
  Knex.migrate
    .latest()
    .then(() => {
      startServer();
    })
    .catch((err) => {
      console.error(err);
    });
} else {
  startServer();
}
