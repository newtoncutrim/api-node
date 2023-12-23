import Reserve from "../models/Reserve";
import House from "../models/House";
import User from "../models/User";

class ReserveController {
    async store(req, res){
        const {data} = req.body;
        const {id_user} = req.headers;
        const {id_house} = req.params;

        const reserva = await Reserve.create({
            data: data,
            user: id_user,
            house: id_house
        });
        const house = await House.findById(id_house);
       
        if(!house){
            return res.status(400).json({error: "House not found"})
        }

        if(house.status !== true){
            return res.status(401).json({error: "indisponivel"});
        }

        const user = await User.findById(id_user);
        if(String(user._id) === String(house.user)){
            return res.status(401).json({error: "nao permitido"});
        }
        await reserva.populate('house');
        await reserva.populate('user');

        return res.json(reserva);
    }
}

export default new ReserveController;