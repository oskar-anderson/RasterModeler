/******/ // The require scope
/******/ var __webpack_require__ = {};
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/******/ /* webpack/runtime/make namespace object */
/******/ (() => {
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};
/*!******************************************!*\
  !*** ./webapp/wwwroot/ts/Transaction.ts ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transaction": () => (/* binding */ Transaction)
/* harmony export */ });
class Transaction {
    constructor() {
        this.undoHistory = [];
        this.redoHistory = [];
    }
    execute(transaction, context) {
        return this._execute(transaction, context);
    }
    _execute(transaction, context, isUndo = false) {
        let registeredCommands = [
            {
                commandName: "moveTableRelative",
                commandFunc: (transaction) => {
                    let table = context.tables.find(x => x.id === transaction.args.id);
                    table.rect.x += transaction.args.x;
                    table.rect.y += transaction.args.y;
                    return table.rect;
                },
                reverseArgsForUndoFunc: (args) => {
                    let reversedArgs = args;
                    reversedArgs.x = -reversedArgs.x;
                    reversedArgs.y = -reversedArgs.y;
                    return reversedArgs;
                }
            }
        ];
        let commandToExecute = registeredCommands.find(x => x.commandName === transaction.command);
        if (!commandToExecute) {
            console.error('Unknown command given!');
            return;
        }
        if (!isUndo) {
            this.undoHistory.push(transaction);
            this.redoHistory = [];
        }
        else {
            transaction.args = commandToExecute.reverseArgsForUndoFunc(transaction.args);
            this.redoHistory.push(transaction);
            this.undoHistory = [];
        }
        return commandToExecute.commandFunc(transaction);
    }
    redo(context) {
        let command = this.redoHistory.pop();
        if (command) {
            this._execute(command, context, false);
        }
    }
    undo(context) {
        let command = this.undoHistory.pop();
        if (command) {
            this._execute(command, context, true);
        }
    }
}

var __webpack_exports__Transaction = __webpack_exports__.Transaction;
export { __webpack_exports__Transaction as Transaction };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNhY3Rpb24uanMiLCJtYXBwaW5ncyI6IlNBQUE7U0FDQTs7Ozs7VUNEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBLHlDQUF5Qyx3Q0FBd0M7VUFDakY7VUFDQTtVQUNBOzs7OztVQ1BBOzs7OztVQ0FBO1VBQ0E7VUFDQTtVQUNBLHVEQUF1RCxpQkFBaUI7VUFDeEU7VUFDQSxnREFBZ0QsYUFBYTtVQUM3RDs7Ozs7Ozs7Ozs7O0FDTk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly8vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovLy93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovLy8uL3dlYmFwcC93d3dyb290L3RzL1RyYW5zYWN0aW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoZSByZXF1aXJlIHNjb3BlXG52YXIgX193ZWJwYWNrX3JlcXVpcmVfXyA9IHt9O1xuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiZXhwb3J0IGNsYXNzIFRyYW5zYWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvcigpIHtcbiAgICAgICAgdGhpcy51bmRvSGlzdG9yeSA9IFtdO1xuICAgICAgICB0aGlzLnJlZG9IaXN0b3J5ID0gW107XG4gICAgfVxuICAgIGV4ZWN1dGUodHJhbnNhY3Rpb24sIGNvbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2V4ZWN1dGUodHJhbnNhY3Rpb24sIGNvbnRleHQpO1xuICAgIH1cbiAgICBfZXhlY3V0ZSh0cmFuc2FjdGlvbiwgY29udGV4dCwgaXNVbmRvID0gZmFsc2UpIHtcbiAgICAgICAgbGV0IHJlZ2lzdGVyZWRDb21tYW5kcyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb21tYW5kTmFtZTogXCJtb3ZlVGFibGVSZWxhdGl2ZVwiLFxuICAgICAgICAgICAgICAgIGNvbW1hbmRGdW5jOiAodHJhbnNhY3Rpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHRhYmxlID0gY29udGV4dC50YWJsZXMuZmluZCh4ID0+IHguaWQgPT09IHRyYW5zYWN0aW9uLmFyZ3MuaWQpO1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5yZWN0LnggKz0gdHJhbnNhY3Rpb24uYXJncy54O1xuICAgICAgICAgICAgICAgICAgICB0YWJsZS5yZWN0LnkgKz0gdHJhbnNhY3Rpb24uYXJncy55O1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFibGUucmVjdDtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJldmVyc2VBcmdzRm9yVW5kb0Z1bmM6IChhcmdzKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCByZXZlcnNlZEFyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgICAgICAgICByZXZlcnNlZEFyZ3MueCA9IC1yZXZlcnNlZEFyZ3MueDtcbiAgICAgICAgICAgICAgICAgICAgcmV2ZXJzZWRBcmdzLnkgPSAtcmV2ZXJzZWRBcmdzLnk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXZlcnNlZEFyZ3M7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgICAgICBsZXQgY29tbWFuZFRvRXhlY3V0ZSA9IHJlZ2lzdGVyZWRDb21tYW5kcy5maW5kKHggPT4geC5jb21tYW5kTmFtZSA9PT0gdHJhbnNhY3Rpb24uY29tbWFuZCk7XG4gICAgICAgIGlmICghY29tbWFuZFRvRXhlY3V0ZSkge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignVW5rbm93biBjb21tYW5kIGdpdmVuIScpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaXNVbmRvKSB7XG4gICAgICAgICAgICB0aGlzLnVuZG9IaXN0b3J5LnB1c2godHJhbnNhY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5yZWRvSGlzdG9yeSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdHJhbnNhY3Rpb24uYXJncyA9IGNvbW1hbmRUb0V4ZWN1dGUucmV2ZXJzZUFyZ3NGb3JVbmRvRnVuYyh0cmFuc2FjdGlvbi5hcmdzKTtcbiAgICAgICAgICAgIHRoaXMucmVkb0hpc3RvcnkucHVzaCh0cmFuc2FjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnVuZG9IaXN0b3J5ID0gW107XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbW1hbmRUb0V4ZWN1dGUuY29tbWFuZEZ1bmModHJhbnNhY3Rpb24pO1xuICAgIH1cbiAgICByZWRvKGNvbnRleHQpIHtcbiAgICAgICAgbGV0IGNvbW1hbmQgPSB0aGlzLnJlZG9IaXN0b3J5LnBvcCgpO1xuICAgICAgICBpZiAoY29tbWFuZCkge1xuICAgICAgICAgICAgdGhpcy5fZXhlY3V0ZShjb21tYW5kLCBjb250ZXh0LCBmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdW5kbyhjb250ZXh0KSB7XG4gICAgICAgIGxldCBjb21tYW5kID0gdGhpcy51bmRvSGlzdG9yeS5wb3AoKTtcbiAgICAgICAgaWYgKGNvbW1hbmQpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4ZWN1dGUoY29tbWFuZCwgY29udGV4dCwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=