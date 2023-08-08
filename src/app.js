import express from "express"
import router from "./routes/index.routes.js";

const app = express();

app.use(express.json())
app.use(cors);
app.use(router); //será mostrado na seção de "ARQUITETURA"

const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})
