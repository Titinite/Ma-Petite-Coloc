import express from "express";
import cors from "cors";
import userRoutes from "./routes/user/user.routes";
import userColections from "./routes/colocation/colocation.routes";
import userLog from "./routes/user/userLog.routes";
import colocationLog from "./routes/colocation/colocationLog.routes";

const app = express();

// Middlewares globaux
app.use(express.json());                                // Permet de lire le body en JSON
app.use(cors());                                        // Active CORS pour les requêtes cross-origin
// app.use(helmet());                                   // Sécurise les headers HTTP

// Routes
app.get("/", (req, res) => {
  throw new Error("Il n'y a rien d'implémenté dans cette route, à vous de jouer !");
});

app.use("/api/users", userRoutes);                      // Routes pour les utilisateurs
app.use("/api/colocations", userColections);            // Routes pour les collections
app.use("/api/logs/users", userLog);                    // Routes pour les logs users
app.use("/api/logs/colocations", colocationLog);        // Routes pour les logs colocations

// Middleware de gestion des erreurs (à vous de le personnaliser pour qu'il soit réutilisable, pensez aux classes d'erreurs)
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.log(err);
  
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    statusCode,
    errorCode: err.code || "INTERNAL_SERVER_ERROR",
    message: err.message || "An unexpected error occurred",
  });
});

export default app;