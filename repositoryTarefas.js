import pool from '../elefante/db.js'

export const tRepository = {
    async listar(){
        const sql = `SELECT * FROM tarefas ORDER BY id ASC`
        const { rows } = await pool.query(sql)
        return rows
    },

    async buscarPorId(id){
        const sql = 
        `SELECT * FROM tarefas 
        WHERE id = $1`
        const { rows } = await pool.query(sql, [id])
        return rows[0]
    },

    async criar(titulo){
        const sql = `INSERT INTO tarefas (titulo) VALUES ($1) RETURNING *;`
        const { rows } = await pool.query(sql, [titulo])
        return rows[0]
    },

    async atualizar(id, titulo, concluida){
        const sql = 
        `UPDATE tarefas 
        SET titulo = $1, concluida = $2 
        WHERE id = $3 RETURNING *`
        const { rows } = await pool.query(sql, [titulo, concluida, id])
        return rows[0]
    },
    async deletar(id){
        const sql = 
        `DELETE FROM tarefas 
        WHERE id = $1 RETURNING id`
        const { rows } = await pool.query(sql, [id])
        return rows[0]
    }
}