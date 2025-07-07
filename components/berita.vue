<template>
  <section class="bg-gray-100 py-8" id="berita">
    <div class="max-w-7xl mx-auto px-4">
      <h1 class="text-2xl font-bold text-center text-gray-800 mb-6">BERITA</h1>

      <!-- Flex Horizontal Scroll -->
      <div class="flex gap-4 overflow-x-auto scrollbar-hide">
        <div
          v-for="(item, i) in beritaList"
          :key="i"
          class="min-w-[180px] max-w-[180px] h-[260px] bg-white shadow rounded overflow-hidden relative"
        >
          <!-- Gambar -->
          <img :src="item.gambar" class="w-full h-[1px] object-cover" />

          <!-- Tanggal -->
          <div class="absolute top-2 left-2 bg-pink-600 text-white text-xs px-2 py-1 rounded text-center shadow">
            <p class="font-bold leading-none">{{ item.tanggal.split(' ')[0] }}</p>
            <p class="text-[10px] uppercase">{{ item.tanggal.split(' ')[1] }}</p>
          </div>

          <!-- Judul dan Deskripsi -->
          <div class="p-2">
            <h2 class="text-sm font-semibold text-gray-800 truncate">
              {{ item.judul }}
            </h2>
            <p class="text-xs text-gray-600 line-clamp-2">
              {{ item.deskripsi }}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const beritaList = [
  {
    slug: "vaksin-desa-dangdang",
    tanggal: "12 Jun",
    judul: "Karya Bakti TNI Bersama Warga Desa Dangdang",
    deskripsi: "Dalam rangka mempererat kemanunggalan TNI dengan rakyat, kegiatan Karya Bakti TNI dilaksanakan di Desa Dangdang. Kegiatan ini melibatkan gotong royong bersama warga untuk memperbaiki jalan desa, membersihkan saluran air, dan membangun fasilitas umum demi meningkatkan kenyamanan dan kesejahteraan masyarakat.",
    gambar: "https://scontent.fcgk8-1.fna.fbcdn.net/v/t39.30808-6/487824629_9379577705493613_904605263903795330_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGnEid1Sqe4l-DTMRuM-JT44vd9_ezTK2Pi93397NMrY3La_GHDYWSyEWppT8RoxrrKG-j7OIjHsjfll_MtUgqH&_nc_ohc=yLJNJZ1gcfcQ7kNvwGMe6_n&_nc_oc=AdnrJgWxBw-qFOGq8D-3vObIH_Txb1gwBBBSj46HVTw5Hlf6sexzalFkPuPZU-kA7KpasyU7grzEjSBRR4UkZMKP&_nc_zt=23&_nc_ht=scontent.fcgk8-1.fna&_nc_gid=DUixn4W54yvOQ-bAhUkZkA&oh=00_AfTiIWEJ0LlH3egD0Y62ons94v2qMgDZTwaHcNkTkQBNUQ&oe=68716AD6"  },
  {
    slug: "posyandu-remaja",
    tanggal: "05 Jun",
    judul: "Posyandu Remaja Aktif, Wujud Peduli Kesehatan Generasi Muda",
    deskripsi: "Posyandu Remaja di Desa Dangdang terus aktif menyelenggarakan kegiatan rutin setiap bulan. Dalam kegiatan ini, para remaja mendapatkan layanan pemeriksaan kesehatan, penyuluhan gizi, dan edukasi tentang gaya hidup sehat. Program ini bertujuan untuk membentuk generasi muda yang sehat, sadar kesehatan, dan siap menghadapi tantangan masa depan.",
    gambar: "https://scontent.fcgk9-1.fna.fbcdn.net/v/t39.30808-6/488938280_9422338221217561_3275726098582366126_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFTkWt56fZ8q57sNqqWsybZcULurg0ktp9xQu6uDSS2n0GiAJMviLvCv-46FinIf3Vt1KhQXT3Gat7CbyFFulU2&_nc_ohc=Vs_80DzzPwsQ7kNvwGz7Y7X&_nc_oc=Adk4p1uaRXAVUIY7fSjqKhsx9beXAP2fszPWggdW4BKGypbR8l2ZYNCdj7nWfCE1pp-H7GFpshtsdwcjg-OYYMGL&_nc_zt=23&_nc_ht=scontent.fcgk9-1.fna&_nc_gid=X8hx3cwKa8GxNbZEyLoULA&oh=00_AfQ2Hmp1Zd1D4EesmWOXbPtMcn-Z8Eu9D8mist0Q6rw1DQ&oe=68716BC5"  },
  {
    slug: "traktor-baru",
    tanggal: "01 Jun",
    judul: "Warga Desa Dangdang Antusias Ikuti Vaksinasi Massal",
    deskripsi: "Pemerintah Desa Dangdang bekerja sama dengan tenaga kesehatan setempat menggelar kegiatan vaksinasi massal untuk warga. Kegiatan ini disambut antusias oleh masyarakat sebagai bentuk dukungan terhadap program kesehatan nasional. Vaksinasi berlangsung tertib dan lancar di balai desa dengan tetap menerapkan protokol kesehatan.",
    gambar: "https://scontent.fcgk8-1.fna.fbcdn.net/v/t39.30808-6/475421803_9018995101551877_699815792004861173_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeED9quhv6ZHcm14ZqSY25rI8ZAj9OGk0k3xkCP04aTSTb4XnUKKexJpJP_X4VMZpfYjABxTxDJbU6WhiAkeYqJl&_nc_ohc=bSCjdjNP_NIQ7kNvwHc9Bga&_nc_oc=AdmCV2AWIU38cxF_2ZbWrN3iuwOu7J_c5v_cEZeQkWNgG6g2QyIqCz6oFQXPWuVjmDF3MEt5v3hMsNRKeX2BuHig&_nc_zt=23&_nc_ht=scontent.fcgk8-1.fna&_nc_gid=j9y1VcUJHH5Yw5urRVH2jQ&oh=00_AfTPazF6l-GrtV0KP9SO2O6AjVoprRXUQIoMcrVhqoWZJQ&oe=68718532"
  }
]
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
