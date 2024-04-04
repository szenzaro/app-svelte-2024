export interface TodoData {
    id: string;
    label: string;
    state: 'done' | 'tbd';
}

export interface ListData {
    id: string;
    label: string;
    todos: TodoData[];
}

export class MockDB {
    private static instance: MockDB;
    static getDB() {
        if (!MockDB.instance) {
            MockDB.instance = new MockDB();
        }
        return MockDB.instance;
    }

    mockData = $state<ListData[]>([
        {
            id: '1', label: 'Git', todos: [
                { id: '1', label: 'git add', state: 'done' },
                { id: '2', label: 'git commit', state: 'tbd' },
                { id: '3', label: 'git push', state: 'tbd' },
                { id: '4', label: 'leave building', state: 'tbd' },
            ]
        },
        {
            id: '2', label: 'React', todos: [
                { id: '1', label: 'Javascript', state: 'tbd' },
                { id: '2', label: 'Jsx', state: 'done' },
            ]
        },
        { id: '3', label: 'Svelte', todos: [] },
        { id: '4', label: 'Angular', todos: [] },
    ]);

    getLists() { return this.mockData; }

    getList(id: string) {
        return this.mockData.find((l) => l.id === id)
    }

    getTodos(id: string) {
        const listById = this.getList(id);
        return listById?.todos ?? [];
    }

    updateTodo(listId: string, id: string, newTodo: Partial<TodoData>) {
        this.mockData = this.mockData.map(l => l.id !== listId ? l : { ...l, todos: l.todos.map(t => t.id !== id ? t : { ...t, ...newTodo }) });
    }

    updateListLabel(id: string, label: string) {
        this.mockData = this.mockData.map(l => l.id === id ? { ...l, label } : l);
    }

    addList(label: string) {
        this.mockData.push({ id: window.crypto.randomUUID(), label, todos: [] });
        // this.mockData = [...this.mockData, { id: window.crypto.randomUUID(), label, todos: [] }];
    }

    addTodo(listId: string, label: string) {
        const newTodo: TodoData = {
            id: window.crypto.randomUUID(),
            label,
            state: 'tbd',
        };

        this.mockData = this.mockData.map((l) => l.id !== listId ? l : { ...l, todos: [...l.todos, newTodo] });
    }

    deleteList(id: string) {
        this.mockData = this.mockData.filter(l => l.id !== id);
    }

    deleteTodo(listId: string, id: string) {
        this.mockData = this.mockData.map(l => l.id !== listId ? l : { ...l, todos: l.todos.filter(t => t.id !== id) });
    }
}

export const db = MockDB.getDB();
