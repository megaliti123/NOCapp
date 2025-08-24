import 'dotenv/config';
import * as env from 'env-var';

export const envs = {
    mailerEmail: env.get('MAILER_EMAIL').required().asEmailString(),
    mailerPassword: env.get('MAILER_PASSWORD').required().asString(),
    port: env.get('PORT').default(3000).asPortNumber()
};


