import { tRepository } from "../repository/repositoryTarefas.js";

export const tService = { // objeto principal exportado para controller
    async listar(){ // função de listagem geral 
        return await tRepository.listar()
    },

    async listarPorId(id){ // chama repository para listar tarefa especifica do id passado 
        if(!id){
            throw new Error('Id obrigatório')
        }
        const alvo = await tRepository.buscarPorId(id)

        if(!alvo){
            throw new Error('Tarefa não encontrada')
        }
        return alvo
    },

    async criar(titulo){ // chama repository para listar tarefa especifica por id de req.
        const novaTarefa = await tRepository.criar(titulo)
        return novaTarefa
    },

    async atualizar(id, titulo, concluida){ // chama repository para atualizar tarefa com id passado em req.
        
        const tarefaExistente = await tRepository.buscarPorId(id);
            if (!tarefaExistente) {
            throw new Error('Tarefa não encontrada');
        }

        const novoTitulo = titulo !== undefined ? titulo : tarefaExistente.titulo
        const novoStatus = concluida !== undefined ? concluida : tarefaExistente.concluida

        if(tarefaExistente.titulo === novoTitulo 
            && tarefaExistente.concluida === novoStatus
        ){
            return tarefaExistente
        }

        return await tRepository.atualizar(id, novoTitulo, novoStatus)
    },

    async deletar(id){ // chama repository para deletar tarefa com id passado no req.
        const alvo = await tRepository.deletar(id)
        if(!alvo){
            throw new Error('Tarefa não encontrada')
        }
        return alvo
    }
}