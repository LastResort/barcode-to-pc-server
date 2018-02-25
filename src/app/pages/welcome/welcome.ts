import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '../../services/storage.service';
import { UtilsService } from '../../services/utils.service';
import { ConfigService } from '../../services/config.service';
import { ElectronService } from '../../services/electron.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.html',
  styleUrls: ['./welcome.scss']
})
export class WelcomePage implements OnInit {
  @ViewChild("qrCode") qrCode;

  public qrCodeUrl = '';

  constructor(
    private storage: Storage,
    private router: Router,
    private utilsService: UtilsService,
    public electronService: ElectronService,
  ) {
    if (this.electronService.isElectron()) {
      this.electronService.ipcRenderer.on('clientConnected', (e, clientAddress) => {
        this.openMainPage();
      });
      this.utilsService.getQrCodeUrl().then((url: string) => this.qrCodeUrl = url);
    }
  }
  ngOnInit() { }

  public openMainPage() {
    console.log('click')
    this.storage.setEverConnected(true);
    this.router.navigate(['/scan-session']);
  }

  openFAQ() {
    this.electronService.shell.openExternal(ConfigService.URL_FAQ);
  }

}