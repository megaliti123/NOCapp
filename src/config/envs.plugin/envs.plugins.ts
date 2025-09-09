import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    mailerEmail: env.get('MAILER_EMAIL').required().asEmailString(),
    mailerPassword: env.get('MAILER_PASSWORD').required().asString(),
    port: env.get('PORT').required().asPortNumber(),
    prod: env.get('PROD').required().asBool(),
    mailerService: env.get('MAILER_SERVICE').required().asString()
};


