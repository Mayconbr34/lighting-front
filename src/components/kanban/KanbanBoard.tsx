import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";

const STATUSES = [
  { id: "open", title: "Aberto" },
  { id: "in-progress", title: "Em Andamento" },
  { id: "resolved", title: "Resolvido" }
];

export function KanbanBoard({ tickets }: { tickets: Ticket[] }) {
  const onDragEnd = (result: DropResult) => {
    // Lógica de atualização de status
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {STATUSES.map((status) => (
          <Droppable key={status.id} droppableId={status.id}>
            {(provided) => (
              <Card
                ref={provided.innerRef}
                className="p-4 bg-muted/50 min-h-[500px]"
              >
                <h3 className="text-lg font-semibold mb-4">{status.title}</h3>
                {tickets
                  .filter((t) => t.status === status.id)
                  .map((ticket, index) => (
                    <Draggable
                      key={ticket.id}
                      draggableId={ticket.id}
                      index={index}
                    >
                      {(provided) => (
                        <Card
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 mb-2 cursor-grab"
                        >
                          <TicketCard ticket={ticket} />
                        </Card>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </Card>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}