import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

type MemberDetails = {
  id?: string;
  name?: string;
  email?: string;
  nSocio?: string;
  type?: string;
  phone?: string;
  morada?: string;
  status?: string;
  birthdate?: Date | string;
  memberSince?: Date | string;
    Whatsapp?: string;
    joiaPaid?: boolean;
    quotaPaid?: { [year: string]: boolean };
};

export function MemberDetailsDialogTrigger({
  children,
  member,
}: {
  children: React.ReactNode;
  member?: MemberDetails;
}) {
  const formatDate = (value?: Date | string) => {
    if (!value) return "";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("pt-PT");
  };
  const whatsappText = member?.Whatsapp ? "Sim" : "Não";
  const joiaText = member?.joiaPaid ? "Sim" : "Não";
  const statusText =
    member?.status === "active" ? "Ativo" : member?.status === "inactive" ? "Inativo" : "";
  const quotas = Object.entries(member?.quotaPaid ?? {});

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-170">
        <DialogHeader>
          <DialogTitle>Detalhes do Sócio</DialogTitle>
          <DialogDescription>Informações do membro selecionado.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          {/* Identificação */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" readOnly value={member?.name ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nSocio">Nº Sócio</Label>
              <Input id="nSocio" readOnly value={member?.nSocio ?? ""} />
            </div>
          </div>

          {/* Contactos */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" readOnly value={member?.email ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" readOnly value={member?.phone ?? ""} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="morada">Morada</Label>
            <Input id="morada" readOnly value={member?.morada ?? ""} />
          </div>

          {/* Estado */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" readOnly value={member?.type ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" readOnly value={statusText} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsapp">Whatsapp</Label>
              <Input id="whatsapp" readOnly value={whatsappText} />
            </div>
          </div>

          {/* Financeiro */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="joia">Jóia paga</Label>
              <Input id="joia" readOnly value={joiaText} />
            </div>
            <div className="grid gap-2">
              <Label>Quotas</Label>
              <div className="grid grid-cols-2 gap-2">
                {quotas.length === 0 ? (
                  <span className="text-muted-foreground">Sem registos</span>
                ) : (
                  quotas.map(([year, paid]) => (
                    <div key={year} className="flex items-center justify-between rounded border px-3 py-1">
                      <span className="font-medium">{year}</span>
                      <span className={paid ? "text-green-600" : "text-red-600"}>
                        {paid ? "Pago" : "Em falta"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Datas */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="birthdate">Data de nascimento</Label>
              <Input id="birthdate" readOnly value={formatDate(member?.birthdate)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="memberSince">Sócio desde</Label>
              <Input id="memberSince" readOnly value={formatDate(member?.memberSince)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function MemberDetailsDialog({
  open,
  onOpenChange,
  member,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  member?: MemberDetails
}) {
  const formatDate = (value?: Date | string) => {
    if (!value) return "";
    const d = new Date(value);
    return isNaN(d.getTime()) ? "" : d.toLocaleDateString("pt-PT");
  };
  const whatsappText = member?.Whatsapp ? "Sim" : "Não";
  const joiaText = member?.joiaPaid ? "Sim" : "Não";
  const statusText =
    member?.status === "active" ? "Ativo" : member?.status === "inactive" ? "Inativo" : "";
  const quotas = Object.entries(member?.quotaPaid ?? {});

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-170">
        <DialogHeader>
          <DialogTitle>Detalhes do Sócio</DialogTitle>
          <DialogDescription>Informações do membro selecionado.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome</Label>
              <Input id="name" readOnly value={member?.name ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nSocio">Nº Sócio</Label>
              <Input id="nSocio" readOnly value={member?.nSocio ?? ""} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" readOnly value={member?.email ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input id="phone" readOnly value={member?.phone ?? ""} />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="morada">Morada</Label>
            <Input id="morada" readOnly value={member?.morada ?? ""} />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type">Tipo</Label>
              <Input id="type" readOnly value={member?.type ?? ""} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Status</Label>
              <Input id="status" readOnly value={statusText} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsapp">Whatsapp</Label>
              <Input id="whatsapp" readOnly value={whatsappText} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="joia">Jóia paga</Label>
              <Input id="joia" readOnly value={joiaText} />
            </div>
            <div className="grid gap-2">
              <Label>Quotas</Label>
              <div className="grid grid-cols-2 gap-2">
                {quotas.length === 0 ? (
                  <span className="text-muted-foreground">Sem registos</span>
                ) : (
                  quotas.map(([year, paid]) => (
                    <div key={year} className="flex items-center justify-between rounded border px-3 py-1">
                      <span className="font-medium">{year}</span>
                      <span className={paid ? "text-green-600" : "text-red-600"}>
                        {paid ? "Pago" : "Em falta"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="birthdate">Data de nascimento</Label>
              <Input id="birthdate" readOnly value={formatDate(member?.birthdate)} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="memberSince">Sócio desde</Label>
              <Input id="memberSince" readOnly value={formatDate(member?.memberSince)} />
            </div>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
