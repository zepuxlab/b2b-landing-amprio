#!/usr/bin/env node

/**
 * Simple webhook server for auto-deploying B2B landing page
 * Listens for GitHub webhooks and automatically deploys
 */

const http = require('http');
const { exec } = require('child_process');
const crypto = require('crypto');

const PORT = process.env.PORT || 3005;
const SECRET = process.env.WEBHOOK_SECRET || 'your-secret-key-here';
const REPO_PATH = '/home/ec2-user/officeamprio/b2b';

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/webhook') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', () => {
      try {
        const payload = JSON.parse(body);
        
        // Verify webhook secret if needed
        const signature = req.headers['x-hub-signature-256'];
        if (signature) {
          const hmac = crypto.createHmac('sha256', SECRET);
          const digest = 'sha256=' + hmac.update(body).digest('hex');
          if (signature !== digest) {
            res.writeHead(401, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid signature' }));
            return;
          }
        }
        
        // Only deploy on push to main branch
        if (payload.ref === 'refs/heads/main' && payload.commits) {
          console.log(`[${new Date().toISOString()}] Deploying after push to main...`);
          
          const deployScript = `
            cd ${REPO_PATH} && \
            git pull origin main && \
            npm install && \
            npm run build && \
            sudo chown -R ec2-user:ec2-user ${REPO_PATH} && \
            chmod -R 755 ${REPO_PATH}
          `;
          
          exec(deployScript, (error, stdout, stderr) => {
            if (error) {
              console.error(`Deploy error: ${error}`);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ error: 'Deploy failed', message: error.message }));
              return;
            }
            
            console.log(`[${new Date().toISOString()}] Deploy successful`);
            console.log(stdout);
            if (stderr) console.error(stderr);
            
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, message: 'Deployed successfully' }));
          });
        } else {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ message: 'No deployment needed' }));
        }
      } catch (error) {
        console.error('Error processing webhook:', error);
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid payload' }));
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] B2B Landing Webhook server listening on port ${PORT}`);
});
