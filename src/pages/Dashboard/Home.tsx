import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
      <PageMeta
        title="Selamat Datang | Admin Panel"
        description="Halaman utama admin panel"
      />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
          Selamat Datang
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Selamat datang di halaman admin panel MayFarm
        </p>
      </div>
    </div>
  );
}
