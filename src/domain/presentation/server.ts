import { CronJob } from "cron";
import { CronService } from "./cron/cron-service";
import { CheckService } from "../use-cases/checks/check-service";



export class server{

    public static start() {
        console.log("Server started");


        CronService.createJob(
            '*/2 * * * * *',
            () => {

                new CheckService(
                    () => console.log('success'),
                    (error) => console.log(`${error}`)
                ).execute('https://google.com');

            }
        );


    }
}

