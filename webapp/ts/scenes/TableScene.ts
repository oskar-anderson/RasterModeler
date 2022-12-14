import { Container } from "pixi.js";
import { IScene, Manager } from "../Manager";
import { Draw } from "../model/Draw";
import Modal from "bootstrap/js/dist/modal";
import { DrawScene } from "./DrawScene";
import * as nunjucks from "nunjucks";
import { CommandModifyTable } from "../commands/appCommands/CommandModifyTable";
import { Table } from "../model/Table";
import { CommandDeleteTable } from "../commands/appCommands/CommandDeleteTable";
import { TableRow } from "../model/TableRow";

export class TableScene extends Container implements IScene {

    draw: Draw;
    tableBeingEdited: Table;

    constructor(draw: Draw, selectedTable: Table) {
        super();
        this.draw = draw;
        this.tableBeingEdited = Table.initClone(selectedTable!);
    }

    mouseEventHandler(event: MouseEvent): void {
        throw new Error("Method not implemented.");
    }

    update(deltaMS: number): void {

    }

    init(): void {
        let template = `
        <div>
            <style>
                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                }
                
                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                th {
                    font-weight: bold;
                }

            </style>
            <div class="modal" tabindex="-1">
                <div class="modal-dialog modal-dialog-scrollable" style="max-width: 80%;">
                    <div class="modal-content">
                    <div class="modal-header">
                        <p class="modal-title">
                            Table
                            <input class="input-tablename" type="text" value="{{ table.head }}">
                        </p>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <table>
                        <tr>
                            <th>Name</th>
                            <th style="width: 120px">Datatype</th>
                            <th>Attributes</th>
                            <th>Actions</th>
                        </tr>
                        {% for row in table.tableRows %}
                        <tr data-index="{{ loop.index0 }}">
                            <td>
                                <input class="input-name" type="text" value="{{ row.name }}">
                            </td>
                            <td>
                                <input class="input-datatype" list="mysql-data-types" style="width: 120px" value="{{ row.datatype }}">
                            </td>
                            <td>
                                <input class="input-attributes" list="attribute-suggestions" type="text" value="{{ row.attributes | join(", ") }}">
                            </td>
                            <td>
                                <button class="row-insert-btn btn btn-primary">Insert</button>
                                <button class="row-up-btn btn btn-primary">Up</button>
                                <button class="row-down-btn btn btn-primary">Down</button>
                                <button class="row-delete-btn btn btn-danger">Delete</button>
                            </td>
                        </tr>
                        {% if loop.last %}
                            <tr data-index="{{ loop.index0 + 1 }}">
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button class="row-insert-btn btn btn-primary">Insert</button>
                                </td>
                            </tr>
                        {% endif %}
                        {% endfor %}
                        <datalist id="mysql-data-types">
                            <option value="VARCHAR(255)">
                            <option value="VARCHAR(255)?">
                            <option value="INT">
                            <option value="INT?">
                            <option value="FLOAT(14,2)">
                            <option value="FLOAT(14,2)?">
                            <option value="BOOLEAN">
                            <option value="BOOLEAN?">
                        </datalist>
                        <datalist id="attribute-suggestions">
                            <option value="PK">
                            <option value='FK("TableName")'>
                        </datalist> 
                        </table>
                    </div>
                    <div class="modal-footer" style="justify-content: space-between;">
                        <button class="table-delete-btn btn btn-danger">Delete table</button>
                        <div>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" id="modal-save-changes" class="btn btn-primary">Save changes</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        let html = nunjucks.renderString(template, { table: this.tableBeingEdited! }); 
        document.querySelector(".table-edit-container")!.innerHTML = html;
        let modalEl = document.querySelector(".modal")!
        let modal = new Modal(modalEl, {});
        modal.show();
        document.querySelector(".modal")!.addEventListener("hide.bs.modal", () => {
            console.log("modal closed!");
            Manager.changeScene(new DrawScene(this.draw))
        })
        document.querySelector("#modal-save-changes")!.addEventListener("click", () => {
            console.log("save-changes!");
            let oldTable = this.draw.schema.tables.find(x => x.equals(this.tableBeingEdited))!;
            this.draw.selectedTable = this.tableBeingEdited!;
            this.draw.history.execute(new CommandModifyTable(
                this.draw, 
                {
                    oldTableJson: JSON.stringify(oldTable), 
                    newTableJson: JSON.stringify(this.tableBeingEdited!)
                }
            ));
            modal.dispose();
            this.draw.schema.relations.forEach(relation => relation.isDirty = true);
            Manager.changeScene(new DrawScene(this.draw))
        })

        document.querySelector('.input-tablename')?.addEventListener('input', (e) => {
            this.tableBeingEdited.head = (e.target as HTMLInputElement).value;
        });
        let nameInputs = document.querySelectorAll(".input-name")
        let datatypeInputs = document.querySelectorAll(".input-datatype")
        let attributesInputs = document.querySelectorAll(".input-attributes")
        for (const nameInput of nameInputs) {
            nameInput.addEventListener("input", (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                this.tableBeingEdited.tableRows[index].name = (e.target as HTMLInputElement).value;
            });
        }
        for (const datatypeInput of datatypeInputs) {
            datatypeInput.addEventListener("input", (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                this.tableBeingEdited.tableRows[index].datatype = (e.target as HTMLInputElement).value;
            });
        }
        for (const attributesInput of attributesInputs) {
            attributesInput.addEventListener("input", (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                this.tableBeingEdited.tableRows[index].attributes = (e.target as HTMLInputElement).value.split(",").map(x => x.trim());
            });
        }

        let insertBtns = document.querySelectorAll(".row-insert-btn")
        let upBtns = document.querySelectorAll(".row-up-btn")
        let downBtns = document.querySelectorAll(".row-down-btn")
        let deleteBtns = document.querySelectorAll(".row-delete-btn")
        for (const insertBtn of insertBtns) {
            insertBtn.addEventListener("click", (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                this.tableBeingEdited!.tableRows.splice(index,  0, TableRow.init("", "", []));
                modal.dispose();
                this.init();
            });
        }
        for (const upBtn of upBtns) {
            upBtn.addEventListener('click', (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                if (index <= 0) return;
                [this.tableBeingEdited!.tableRows[index], this.tableBeingEdited!.tableRows[index - 1]] = 
                    [this.tableBeingEdited!.tableRows[index - 1], this.tableBeingEdited!.tableRows[index]];
                modal.dispose();
                this.init();
            })
        }
        for (const downBtn of downBtns) {
            downBtn.addEventListener('click', (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                if (index >= this.tableBeingEdited!.tableRows.length - 1) return;
                [this.tableBeingEdited!.tableRows[index], this.tableBeingEdited!.tableRows[index + 1]] = 
                    [this.tableBeingEdited!.tableRows[index + 1], this.tableBeingEdited!.tableRows[index]];
                modal.dispose();
                this.init();
            })
        }
        for (const deleteBtn of deleteBtns) {
            deleteBtn.addEventListener('click', (e) => {
                let index = Number((e.target as HTMLElement).parentElement!.parentElement!.dataset.index!);
                this.tableBeingEdited!.tableRows.splice(index, 1);
                modal.dispose();
                this.init();
            })
        }
        document.querySelector(".table-delete-btn")?.addEventListener('click', (e) => {
            this.draw.history.execute(
                new CommandDeleteTable(
                    this.draw, 
                    {
                        tableJson: JSON.stringify(this.tableBeingEdited!),
                        listIndex: this.draw.schema.tables.findIndex(x => x.equals(this.tableBeingEdited))
                    }
                )
            )
            modal.dispose();
            this.draw.schema.relations.forEach(relation => relation.isDirty = true);
            Manager.changeScene(new DrawScene(this.draw))
        });
    }
    
    destroyHtmlUi(): void {
        document.querySelector(".table-edit-container")!.innerHTML = ``;
    }


}
