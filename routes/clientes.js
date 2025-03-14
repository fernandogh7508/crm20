const express = require('express');
const router = express.Router();
const pool = require('../db');
//crear un cliente
router.post('/', async (req, res) => {
    try {
        const { nombre, email, telefono } = req.body;
        const [result] = await pool.execute(
            'INSERT INTO cliente (nombre, email, telefono) VALUES (?,?,?)',
            [nombre, email, telefono]
        );
        res.status(201).json({ id: result.insertId, nombre, email, telefono });
        
    } catch (err) {
        res.status(500).send(err);
    }
});
//obtener un cliente
router.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute(
            'SELECT * FROM cliente');
        res.json(rows);
        
    } catch (err) {
        res.status(500).send(err);
    }
});

//obtener un solo cliente por el id

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.execute(
            'SELECT * FROM cliente WHERE id_cliente =?',
            [id]
        );
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
    } catch (err) {
        res.status(500).send(err);
    }
});

router.put('/:id',async(req,res)=>{
    try{
        const { id } = req.params;
        const { nombre, email, telefono } = req.body;
        const [result] = await pool.execute(
            'UPDATE cliente SET nombre=?, email=?, telefono=? WHERE id_cliente=?',
            [nombre, email, telefono, id]
        );
        if(result.affectedRows > 0){
            res.json({ message: 'Cliente actualizado correctamente' });
        }else{
            res.status(404).json({ message: 'Cliente no encontrado' });
        }
        
    }catch(err){
        res.status(500).send(err);
    }

});
module.exports = router;
