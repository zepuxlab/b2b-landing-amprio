module.exports = {
  apps: [
    {
      name: 'b2b-landing-webhook',
      script: 'deploy-webhook.js',
      cwd: '/home/ec2-user/officeamprio/b2b',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '200M',
      env: {
        NODE_ENV: 'production',
        PORT: 3005,
        WEBHOOK_SECRET: process.env.WEBHOOK_SECRET || 'change-this-secret'
      },
      error_file: '/home/ec2-user/.pm2/logs/b2b-landing-webhook-error.log',
      out_file: '/home/ec2-user/.pm2/logs/b2b-landing-webhook-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
