"use client"
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from "next/link"
import Script from 'next/script';
import { MainNav } from "@/components/main-nav"
import { ModelManager } from "@/components/model-manager"
import { Footer } from "@/components/footer"
import { Modal } from "@/components/modal/modal" // Import the new Modal component
import { Button } from "@/components/button"
import AEMHeadless from '@adobe/aem-headless-client-js';
import { ProductListPage } from "@/components/product-list-page/product-list-page"

export default function Page({ params }) {
  const router = useRouter()
  const [aemEnvironment, setAemEnvironment] = useState('');
  const [projectName, setProjectName] = useState('');
  const [config, setConfig] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [editorProps, setEditorProp] = useState({});
  const [content, setContent] = useState(null)

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleSubmit = (e) => { }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const aemEnvironment = localStorage.getItem('aemEnvironment');
      const projectName = localStorage.getItem('projectName');

      if (!aemEnvironment || !projectName) {
        setShowModal(true);
        return;
      }
      setConfig({
        env: aemEnvironment,
        project: projectName,
      });
      const randomNumber = Math.random().toString(36).substring(2, 15)
      const graphqlEndpoint = `${aemEnvironment}/graphql/execute.json/${projectName}/screenByPath;path=/content/dam/v0/home/home;variation=master?_=${randomNumber}`

      const sdk = new AEMHeadless({
        serviceURL: aemEnvironment,
        endpoint: '/graphql/execute.json',
        fetch: ((resource, options = {}) => {
          if (resource.startsWith('https://author-'))
            options.credentials = 'include';
          return window.fetch(resource, options);
        })
      });

      sdk.runPersistedQuery('v0/screenByPath', { path: `/${params.slug.join('/')}`, variation: `master`, v1: randomNumber })
        .then(({ data }) => {
          if (data) {
            setContent(data?.screenByPath?.item);
            setEditorProp({
              'data-aue-resource': `urn:aemconnection:${data?.screenByPath?.item?._path}/jcr:content/data/master`,
              'data-aue-type': 'container',
              'data-aue-filter': 'screen',
              'data-aue-label': 'Screen',
              'data-aue-model': data?.screenByPath?.item?._model?._path
            });
          }
        })
        .catch((error) => {
          console.log(`Error with screen request. ${error.message}`);
        });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (projectName) {
        localStorage.setItem('projectName', projectName);
      }
    }
  }, [projectName]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (aemEnvironment) {
        localStorage.setItem('aemEnvironment', aemEnvironment);
      }
    }
  }, [aemEnvironment]);

  return (
    <>
      <Script src="https://universal-editor-service.adobe.io/cors.js" async />
      <div className="flex flex-col min-h-screen bg-white text-gray-900">
        {/* Top Utility Bar */}
        <div className="utility-bar">
          <Link href="#" className="hover:underline">
            Find a Store
          </Link>
          <Link href="#" className="hover:underline">
            Help
          </Link>
          <Link href="#" className="hover:underline">
            Join Us
          </Link>
          <Link href="#" className="hover:underline">
            Sign In
          </Link>
        </div>
        {/* Main Header/Navbar */}
        {config && (<MainNav config={config} />)}
        <main className="flex-1" {...editorProps}>
          {content && content.block.map((block, n) => {
            return (
              <div key={n} className="block-container">
                <ModelManager key={n} content={block} config={config} />
              </div>
            )
          })}
          {/* <ProductListPage /> */}
        </main>
        <Footer />
        <Modal isOpen={showModal} onClose={handleCloseModal}>
          <h2>Configure Project</h2>
          <form onSubmit={handleSubmit} className="modal-form">
            <div className="modal-form-group">
              <label htmlFor="aemEnvironment">AEM Environment:</label>
              <input
                type="text"
                id="aemEnvironment"
                value={aemEnvironment}
                onChange={(e) => setAemEnvironment(e.target.value)}
                required
              />
            </div>
            <div className="modal-form-group">
              <label htmlFor="projectName">Project Name:</label>
              <input
                type="text"
                id="projectName"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />
            </div>
            <div className="modal-form-actions">
              <Button type="button" variant="outline" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </Modal>
      </div>
    </>
  )
}