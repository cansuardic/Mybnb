# Temel görüntü olarak Node.js kullanıyoruz
FROM node:14

# Çalışma dizinini ayarla
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Paket dosyalarını kopyala ve bağımlılıkları yükle
COPY package.json /usr/src/app/

# Bağımlılıkları yükleme adımında loglama ekleme
RUN echo "Installing dependencies..."
RUN npm install

COPY . /usr/src/app

# TypeScript'i derle
RUN echo "Compiling TypeScript..."
RUN npm run build

# Uygulamayı başlat
CMD ["node", "dist/index.js"]
