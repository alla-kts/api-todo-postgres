export const idMiddleware = (req, res, next) => { // tratamento de id
    const { id } = req.params
    const idNumerico = Number(id)

    if(isNaN(idNumerico) || !Number.isInteger(idNumerico) || idNumerico <= 0){
        return res.status(400).json({
            erro: 'ID invalido, deve ser um numero inteiro e positivo'
        })
    }

    req.idLimpo = idNumerico

    next()
};

export const tituloMiddleware = (req, res, next) => { // tratamento de titulo
    let { titulo } = req.body

    if(!titulo || typeof titulo !== 'string'){
        return res.status(400).json({
            error: 'Titulo obrigatório e valido'
        })
    }

    titulo = titulo.trim()

    if(titulo.length === 0){
        return res.status(400).json({
            error: 'O titulo não pode ser apenas espaços em branco! '
        })
    }
    if(titulo.length > 20){
        return res.status(400).json({
            error: 'Isso é uma tarefa ou um livro ?'
        })
    }

    req.tituloLimpo = titulo

    next()
};

export const validaBodyMiddleware = (req, res, next) => { // aqui validamos titulo e concluida como campos em atualização 
    const { titulo, concluida } = req.body

    if(titulo !== undefined){
        const tituloTrim = titulo.toString().trim()
        if(tituloTrim.length === 0 || tituloTrim.length > 20){
            return res.status(400).json({
                error: 'Titutlo deve conter entre 1 e 20 caracteres validos'
            })
        }
        req.tituloLimpo = tituloTrim
    }

    // concluida

    if(concluida !== undefined){
        if(typeof concluida !== 'boolean'){
            return res.status(400).json({
                error: 'Campo concluida precisa ser true ou false'
            })
        }
        req.concluidaLimpa = concluida
    }

    if(titulo === undefined && concluida === undefined){
        return res.status(400).json({
            error: 'Envie algo para atualização dos campos'
        })
    }

    next()
};
