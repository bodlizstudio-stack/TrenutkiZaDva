import fs from 'fs/promises';
import path from 'path';

const DB_FILE = path.join(process.cwd(), 'orders.json');

export async function saveOrder(orderData: any) {
  let orders = [];
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    orders = JSON.parse(data);
  } catch (error) {
    // File doesn't exist or is invalid
  }

  orders.push({
    ...orderData,
    createdAt: new Date().toISOString(),
  });

  await fs.writeFile(DB_FILE, JSON.stringify(orders, null, 2));
}

export async function getOrder(sessionId: string) {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    const orders = JSON.parse(data);
    return orders.find((o: any) => o.sessionId === sessionId);
  } catch (error) {
    return null;
  }
}
