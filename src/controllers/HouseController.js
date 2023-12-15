class HouseController {
    store(req, res){
        console.log(req.body);
        console.log(req.file)
        return res.json({ok: 'ok'});
    }
}

export default new HouseController();