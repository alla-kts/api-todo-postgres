import { tService } from "../service/service.js";

export const tController = { // objeto controller principal exportado
    async listar(req, res){ // função que usa service para listagem de tarefas gerais
        try{
            const tarefas = await tService.listar()
            return res.status(200).json(tarefas)
        } catch(err){
            return res.status(400).json({
                success: false,
                error: err.message
            })
        }
    },

    async listarPorId(req, res){ // função de listagem unica por id
        try{
            const id = req.idLimpo
            const alvo = await tService.listarPorId(id)
            return res.status(200).json(alvo)
        } catch(err){
            return res.status(400).json({
                success: false,
                error: err.message
            })
        }
    },

    async criar(req, res){ // função que cria tarefa com service
        try{
            const titulo = req.tituloLimpo
            const nova = await tService.criar(titulo)
            return res.status(201).json(nova)
        }catch(err){
            return res.status(400).json({
                success: false,
                error: err.message
            })
        }
    },

    async atualizar(req, res){ // função que atualiza tarefa por id com service
        try{
            const id = req.idLimpo
            const concluida = req.concluidaLimpa
            const titulo = req.tituloLimpo
            const atualizada = await tService.atualizar(id, titulo, concluida)
            return res.status(200).json(atualizada)
        } catch(err){
            return res.status(400).json({
                success: false,
                error: err.message
            })
        }
    },

    async deletar(req, res){ // função que deleta tarefa com id especifico pelo service
        try{
            const id = req.idLimpo
            const alvo = await tService.deletar(id)
            return res.status(200).json(alvo)
        }catch(err){
            return res.status(404).json({
                success: false,
                error: err.message
            })
        }
    }
};