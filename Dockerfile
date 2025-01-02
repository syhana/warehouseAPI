# 1. Gunakan base image Node.js versi Alpine (lebih ringan)
FROM node:18-alpine

# 2. Tentukan direktori kerja di dalam container
WORKDIR /usr/src/app

# 3. Salin file package.json dan package-lock.json
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Salin semua file project (selain yang di-ignore) ke WORKDIR
COPY . .

# 6. Buka port 3000 (sesuaikan dengan port yg Anda pakai)
EXPOSE 1232

# 7. Jalankan aplikasi
CMD ["npm", "start"]


