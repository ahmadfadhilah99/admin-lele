import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import Button from "../../components/ui/button/Button";

export default function BasicTables() {
  return (
    <>
      <PageMeta
        title="MayFarm"
        description="Website penjualan bibit ikan"
      />
      <PageBreadcrumb pageTitle="Bibit Ikan Lele" />
      <div className="space-y-6">
          <Button
              size="sm"
              variant="primary"
            >
              Tambah
          </Button>
          <BasicTableOne />
      </div>
    </>
  );
}
