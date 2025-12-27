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
import {Label} from "@/components/ui/label";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

type MemberDetails = {
  id?: string;
  name?: string;
  avatar?: string;
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
  const nameParts = member?.name?.split(" ").filter(part => part.length > 0) ?? [];
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : nameParts.length === 1
      ? nameParts[0][0].toUpperCase()
      : "??";

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-170">
        <DialogHeader>
          <DialogTitle>Detalhes do Sócio</DialogTitle>
          <DialogDescription>
            Informações do membro selecionado.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            {member?.avatar ? (
              <AvatarImage src={member.avatar} alt={member?.name} />
            ) : null}
            <AvatarFallback className="text-2xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
        </div>

        <div className="grid gap-6">
          {/* Identificação */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="name"
                className="text-xs font-semibold text-muted-foreground"
              >
                Nome
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {member?.name ?? "-"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="nSocio"
                className="text-xs font-semibold text-muted-foreground"
              >
                Nº Sócio
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {member?.nSocio ?? "-"}
              </p>
            </div>
          </div>

          {/* Contactos */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="email"
                className="text-xs font-semibold text-muted-foreground"
              >
                Email
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {member?.email ?? "-"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="phone"
                className="text-xs font-semibold text-muted-foreground"
              >
                Telefone
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {member?.phone ?? "-"}
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="morada"
              className="text-xs font-semibold text-muted-foreground"
            >
              Morada
            </Label>
            <p className="text-sm border rounded px-3 py-2">
              {member?.morada ?? "-"}
            </p>
          </div>

          {/* Estado */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="type"
                className="text-xs font-semibold text-muted-foreground"
              >
                Tipo
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {member?.type ?? "-"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="status"
                className="text-xs font-semibold text-muted-foreground"
              >
                Status
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {statusText || "-"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="whatsapp"
                className="text-xs font-semibold text-muted-foreground"
              >
                Whatsapp
              </Label>
              <p className="text-sm border rounded px-3 py-2">{whatsappText}</p>
            </div>
          </div>

          {/* Financeiro */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label
                htmlFor="joia"
                className="text-xs font-semibold text-muted-foreground"
              >
                Jóia paga
              </Label>
              <p className="text-sm border rounded px-3 py-2">{joiaText}</p>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-muted-foreground">
                Quotas
              </Label>
              <div className="grid grid-cols-2 gap-2">
                {quotas.length === 0 ? (
                  <span className="text-muted-foreground text-sm">
                    Sem registos
                  </span>
                ) : (
                  quotas.map(([year, paid]) => (
                    <div
                      key={year}
                      className="flex items-center justify-between rounded border px-3 py-1"
                    >
                      <span className="font-medium text-sm">{year}</span>
                      <span
                        className={
                          paid
                            ? "text-green-600 text-sm"
                            : "text-red-600 text-sm"
                        }
                      >
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
              <Label
                htmlFor="birthdate"
                className="text-xs font-semibold text-muted-foreground"
              >
                Data de nascimento
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {formatDate(member?.birthdate) || "-"}
              </p>
            </div>
            <div className="grid gap-2">
              <Label
                htmlFor="memberSince"
                className="text-xs font-semibold text-muted-foreground"
              >
                Sócio desde
              </Label>
              <p className="text-sm border rounded px-3 py-2">
                {formatDate(member?.memberSince) || "-"}
              </p>
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
  const joiaText = member?.joiaPaid ? "Pago" : "Não";
  const statusText =
    member?.status === "active" ? "Ativo" : member?.status === "inactive" ? "Inativo" : "";
  const quotas = Object.entries(member?.quotaPaid ?? {});
  const nameParts = member?.name?.split(" ").filter((p) => p.length > 0) ?? [];
  const initials =
    nameParts.length > 1
      ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
      : nameParts.length === 1
      ? nameParts[0][0].toUpperCase()
      : "??";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-170">
        <DialogHeader>
          <DialogTitle>Detalhes do Sócio</DialogTitle>
          <DialogDescription>Informações do membro selecionado.</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            {member?.avatar ? (
              <AvatarImage src={member.avatar} alt={member?.name} />
            ) : null}
            <AvatarFallback className="text-2xl font-bold">{initials}</AvatarFallback>
          </Avatar>
        </div>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="text-xs font-semibold text-muted-foreground">Nome</Label>
              <p className="text-sm border rounded px-3 py-2">{member?.name ?? "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nSocio" className="text-xs font-semibold text-muted-foreground">Nº Sócio</Label>
              <p className="text-sm border rounded px-3 py-2">{member?.nSocio ?? "-"}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-xs font-semibold text-muted-foreground">Email</Label>
              <p className="text-sm border rounded px-3 py-2">{member?.email ?? "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone" className="text-xs font-semibold text-muted-foreground">Telefone</Label>
              <p className="text-sm border rounded px-3 py-2">{member?.phone ?? "-"}</p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="morada" className="text-xs font-semibold text-muted-foreground">Morada</Label>
            <p className="text-sm border rounded px-3 py-2">{member?.morada ?? "-"}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="type" className="text-xs font-semibold text-muted-foreground">Tipo</Label>
              <p className="text-sm border rounded px-3 py-2">{member?.type ?? "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status" className="text-xs font-semibold text-muted-foreground">Status</Label>
              <p className="text-sm border rounded px-3 py-2">{statusText || "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="whatsapp" className="text-xs font-semibold text-muted-foreground">Whatsapp</Label>
              <p className="text-sm border rounded px-3 py-2">{whatsappText}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="joia" className="text-xs font-semibold text-muted-foreground">Jóia paga</Label>
              <p className="text-sm border rounded px-3 py-2">{joiaText}</p>
            </div>
            <div className="grid gap-2">
              <Label className="text-xs font-semibold text-muted-foreground">Quotas</Label>
              <div className="grid grid-cols-2 gap-2">
                {quotas.length === 0 ? (
                  <span className="text-muted-foreground text-sm">Sem registos</span>
                ) : (
                  quotas.map(([year, paid]) => (
                    <div key={year} className="flex items-center justify-between rounded border px-3 py-1">
                      <span className="font-medium text-sm">{year}</span>
                      <span className={paid ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
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
              <Label htmlFor="birthdate" className="text-xs font-semibold text-muted-foreground">Data de nascimento</Label>
              <p className="text-sm">{formatDate(member?.birthdate) || "-"}</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="memberSince" className="text-xs font-semibold text-muted-foreground">Sócio desde</Label>
              <p className="text-sm">{formatDate(member?.memberSince) || "-"}</p>
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
