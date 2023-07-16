import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.use(express.json());

interface Vehicle {
    model: string;
    color: string;
    year: number;
    power: number;
}

interface Car extends Vehicle {
    bodyType: string;
    wheelCount: number;
}

interface Boat extends Vehicle {
    draft: number;
}

interface Plane extends Vehicle {
    wingspan: number;
}

const vehicles: Vehicle[] = [];

app.get('/hello', (_req: Request, res: Response) => {
    res.send('Hello world');
});

app.post('/vehicle/add', (req: Request, res: Response) =>{
    const { model, color, year, power, bodyType, wheelCount, draft, wingspan  } = req.body;
    
    let newVehicle: Vehicle;
    if(bodyType){
        newVehicle= { model, color, year, power, bodyType, wheelCount } as Car;
    } else if (draft){
        newVehicle = { model, color, year, power, draft } as Boat;
    } else if (wingspan){
        newVehicle = { model, color, year, power, wingspan } as Plane;
    } else {
        newVehicle = { model, color, year, power };
    }

    vehicles.push(newVehicle);

    res.status(201).send('Vehicle added');
});

app.get('/vehicle/search/:model', (req: Request, res: Response) => {
    const {model} = req.params;
    const matchingVehicle = vehicles.find((vehicle) => vehicle.model === model);


    if(matchingVehicle){
        const { model, color, year, power } = matchingVehicle;
        const responseVehicle: Vehicle = { model, color, year, power };
        res.json(responseVehicle);
    } else {
        res.status(404).json({ error: 'Vehicle not found.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});