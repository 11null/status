import { Subject, Observable } from 'rxjs';
import { ModStatusTaskProgress } from './mod-status-task-progress';
import { Status } from './status';
import { AppModule } from '../app.module';

export class ModStatusTask {

    progress: Subject<ModStatusTaskProgress> = new Subject<ModStatusTaskProgress>();
    status: Status = Status.L;
    response: any = {};
    static requestCount: number = 0;

    public asObservable(): Observable<ModStatusTaskProgress> {
        return this.progress.asObservable();
    }

    async begin() {
        const sleep = async function (ms:number) {return new Promise((resolve)=>setTimeout(resolve,ms))};
        this.status = Status.L;
        const prog = new ModStatusTaskProgress();
        const endpoint = "https://"+AppModule.API_HOSTNAME+"/api/"
        ModStatusTask.requestCount ++;
        console.log(ModStatusTask.requestCount)
        if (ModStatusTask.requestCount>3) {
            /*prog.description = "Too many requests, please wait 5 minutes before checking again or your IP could be temporarily rate limited."
            prog.fakeCommandText = "Taking a break...";
            this.status = Status.E;
            setTimeout(()=>{
                this.status = Status.E;
            },60000)
            this.progress.next(prog)
            return;*/
        }
        const onLoaded = async (responseText:string) => {
            console.log("")
            
            prog.fakeCommandOutput = true;
            const data = JSON.parse(responseText);
            if (this.status!=Status.L) return;
            this.response = data;
            await sleep(100);
            if (this.status!=Status.L) return;
            if (data.rootStatus==data.versionStatus&& data.versionStatus==data.scriptStatus&& data.scriptStatus=="ok") {
                prog.description = "Connection successful, server is UP.";
                if (data.lastOnline!=null && data.lastOnline>0) prog.fakeCommandText = "Last successful connection "+Math.round(data.lastOnline/1000)+" sec. ago."
                prog.fakeCommandText = "Connected OK."
                this.status = Status.S;
                this.progress.next(prog)
            } else {
                prog.description = "Connection failed, server is DOWN."
                prog.fakeCommandText = "Connection failed."
                this.status = Status.E;
                this.progress.next(prog);
            }
            console.log(prog);
        }
        try {
            fetch(endpoint+"status-check").then(e => e.text()).then(onLoaded).catch(e=>{
                fetch("//hsfd43.glitch.me/f3").then(e => e.text()).then(onLoaded).catch(async e=>{
                    const prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = true;
                    await sleep(2000);
                    prog.description = "Failed to check status. Please report problem below. \n \nError: "+e;
                    prog.fakeCommandText = "bash: wget: command not found";
                    this.status = Status.W;
                    this.progress.next(prog)
                });
                setTimeout(async()=>{
                    if (this.status!=Status.L) return;
                    await sleep(1000)
                    if (this.status!=Status.L) return;
                    let prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = true;
                    prog.fakeCommandText = "[sudo] password for dev: ";
                    this.progress.next(prog);
                    prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = false;
                    prog.fakeCommandText = "**********\n";
                    this.progress.next(prog);
                    await sleep(2300);
                    if (this.status!=Status.L) return;
                    prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = true;
                    prog.fakeCommandText = "Host: ";
                    this.progress.next(prog);
                    if (this.status!=Status.L) return;
                    await sleep(1000);
                    prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = false;
                    prog.fakeCommandText = "143.110.226.4\n";
                    if (this.status!=Status.L) return;
                    this.progress.next(prog);
                    prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = true;
                    prog.fakeCommandText = "Port: ";
                    this.progress.next(prog);
                    if (this.status!=Status.L) return;
                    prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = false;
                    prog.fakeCommandText = "5000\n";
                    this.progress.next(prog);
                    prog = new ModStatusTaskProgress();
                    prog.fakeCommandOutput = true;
                    prog.fakeCommandText = "Connecting...\n";
                    if (this.status!=Status.L) return;
                    this.progress.next(prog);
                },2500);
            }).catch(async e=>{
                const prog = new ModStatusTaskProgress();
                prog.fakeCommandOutput = true;
                await sleep(2000);
                prog.description = "Failed to check status. Please report problem below.";
                prog.fakeCommandText = "bash: wget: command not found";
                this.status = Status.W;
                this.progress.next(prog)
            });
        }
        catch (e) {
            alert("unknown error "+e)
        }
    }
}
